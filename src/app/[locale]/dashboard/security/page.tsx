"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Key, Eye, EyeOff, Loader2, AlertCircle, Plus } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useTranslation } from "@/hooks/useTranslation";
import { useApiClient } from "@/lib/api-client";

const PasswordInput = ({ 
  label, 
  value, 
  onChange, 
  show, 
  onToggleShow, 
  error,
  placeholder 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  onToggleShow: () => void;
  error?: string;
  placeholder: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error ? "border-red-300" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={onToggleShow}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        {show ? (
          <EyeOff className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Eye className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    </div>
    {error && (
      <p className="mt-1 text-sm text-destructive">{error}</p>
    )}
  </div>
);

export default function SecurityPage() {
  const { data: session } = useSession();
  const { t } = useTranslation('dashboard');
  const { apiGet, apiPost } = useApiClient();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [setPasswordLoading, setSetPasswordLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [setPasswordMessage, setSetPasswordMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [setPasswordErrors, setSetPasswordErrors] = useState<Record<string, string>>({});
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  
  // 检查用户是否有密码
  useEffect(() => {
    const checkUserPassword = async () => {
      if (!session?.user) return;
      
      try {
        const data = await apiGet('/api/user/has-password');
        setHasPassword(data.hasPassword);
      } catch (error) {
        console.error('Error checking password status:', error);
        // 出错时默认显示修改密码界面
        setHasPassword(true);
      }
    };

    checkUserPassword();
  }, [session, apiGet]);

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) {
      errors.push(t('security.validation.minLength'));
    }
    if (!/[A-Z]/.test(password)) {
      errors.push(t('security.validation.uppercase'));
    }
    if (!/[a-z]/.test(password)) {
      errors.push(t('security.validation.lowercase'));
    }
    if (!/\d/.test(password)) {
      errors.push(t('security.validation.number'));
    }
    return errors;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});

    // 验证表单
    const formErrors: Record<string, string> = {};
    
    if (!currentPassword) {
      formErrors.currentPassword = t('security.errors.currentPasswordRequired');
    }
    
    if (!newPassword) {
      formErrors.newPassword = t('security.errors.newPasswordRequired');
    } else {
      const passwordErrors = validatePassword(newPassword);
      if (passwordErrors.length > 0) {
        formErrors.newPassword = passwordErrors.join(', ');
      }
    }
    
    if (!confirmPassword) {
      formErrors.confirmPassword = t('security.errors.confirmPasswordRequired');
    } else if (newPassword !== confirmPassword) {
      formErrors.confirmPassword = t('security.errors.passwordMismatch');
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    try {
      await apiPost("/api/user/change-password", {
        currentPassword,
        newPassword,
      });
      setMessage(t('security.success'));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(t('security.failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSetPasswordLoading(true);
    setSetPasswordMessage("");
    setSetPasswordErrors({});

    // 验证表单
    const formErrors: Record<string, string> = {};
    
    if (!newPassword) {
      formErrors.newPassword = t('security.errors.passwordRequired');
    } else {
      const passwordErrors = validatePassword(newPassword);
      if (passwordErrors.length > 0) {
        formErrors.newPassword = passwordErrors.join(', ');
      }
    }
    
    if (!confirmPassword) {
      formErrors.confirmPassword = t('security.errors.confirmPasswordRequired');
    } else if (newPassword !== confirmPassword) {
      formErrors.confirmPassword = t('security.errors.passwordMismatch');
    }

    if (Object.keys(formErrors).length > 0) {
      setSetPasswordErrors(formErrors);
      setSetPasswordLoading(false);
      return;
    }

    try {
      // 直接使用 API 路由来设置密码
      await apiPost('/api/user/set-password', { password: newPassword });
      setSetPasswordMessage(t('security.setPasswordSuccess'));
      setNewPassword("");
      setConfirmPassword("");
      
      // 更新 hasPassword 状态，因为用户现在有密码了
      setHasPassword(true);
    } catch (error) {
      console.error('Set password error:', error);
      setSetPasswordMessage(t('security.setPasswordFailed'));
    } finally {
      setSetPasswordLoading(false);
    }
  };

  // 如果还在检查密码状态，显示加载
  if (hasPassword === null) {
    return (
      <div className="min-h-screen bg-background dark:bg-background">
        <Header />
        <DashboardLayout>
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>{t('security.loading')}</span>
            </div>
          </div>
        </DashboardLayout>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Header />
      
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('security.title')}</h1>
            <p className="text-muted-foreground">{t('security.description')}</p>
          </div>

          {/* 设置密码 / 修改密码 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {hasPassword ? <Key className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {hasPassword ? t('security.changePassword') : t('security.setPassword')}
              </CardTitle>
              <CardDescription>
                {hasPassword 
                  ? t('security.changePasswordDesc') 
                  : t('security.setPasswordDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasPassword ? (
                // 修改密码表单
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <PasswordInput
                    label={t('security.currentPassword')}
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    show={showCurrentPassword}
                    onToggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
                    error={errors.currentPassword}
                    placeholder={t('security.currentPasswordPlaceholder')}
                  />

                  <PasswordInput
                    label={t('security.newPassword')}
                    value={newPassword}
                    onChange={setNewPassword}
                    show={showNewPassword}
                    onToggleShow={() => setShowNewPassword(!showNewPassword)}
                    error={errors.newPassword}
                    placeholder={t('security.newPasswordPlaceholder')}
                  />

                  <PasswordInput
                    label={t('security.confirmPassword')}
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    show={showConfirmPassword}
                    onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                    error={errors.confirmPassword}
                    placeholder={t('security.confirmPasswordPlaceholder')}
                  />

                  {/* 密码强度提示 */}
                  <div className="bg-primary/5 border border-blue-200 rounded-md p-3">
                    <div className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">{t('security.requirements.title')}</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>{t('security.requirements.minLength')}</li>
                          <li>{t('security.requirements.mixedCase')}</li>
                          <li>{t('security.requirements.avoidPersonal')}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {message && (
                    <div className={`p-3 rounded-md text-sm ${
                      message.includes("成功") 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-destructive/5 text-red-700 border border-destructive/30"
                    }`}>
                      {message}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('security.changing')}
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        {t('security.changePassword')}
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                // 设置密码表单
                <form onSubmit={handleSetPassword} className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">{t('security.tip')}</p>
                        <p>{t('security.oauthAccountTip')}</p>
                      </div>
                    </div>
                  </div>

                  <PasswordInput
                    label={t('security.newPassword')}
                    value={newPassword}
                    onChange={setNewPassword}
                    show={showNewPassword}
                    onToggleShow={() => setShowNewPassword(!showNewPassword)}
                    error={setPasswordErrors.newPassword}
                    placeholder={t('security.passwordPlaceholder')}
                  />

                  <PasswordInput
                    label={t('security.confirmPassword')}
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    show={showConfirmPassword}
                    onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                    error={setPasswordErrors.confirmPassword}
                    placeholder={t('security.confirmPasswordPlaceholder2')}
                  />

                  {/* 密码强度提示 */}
                  <div className="bg-primary/5 border border-blue-200 rounded-md p-3">
                    <div className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">{t('security.requirements.title')}</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>{t('security.requirements.minLength')}</li>
                          <li>{t('security.requirements.mixedCase')}</li>
                          <li>{t('security.requirements.avoidPersonal')}</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {setPasswordMessage && (
                    <div className={`p-3 rounded-md text-sm ${
                      setPasswordMessage.includes("成功") 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-destructive/5 text-red-700 border border-destructive/30"
                    }`}>
                      {setPasswordMessage}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={setPasswordLoading}
                    className="w-full sm:w-auto"
                  >
                    {setPasswordLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t('security.setting')}
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        {t('security.setPassword')}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* 安全状态 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                {t('security.accountSecurityStatus')}
              </CardTitle>
              <CardDescription>
                {t('security.checkSecuritySettings')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <span className="text-sm font-medium text-foreground">{t('security.emailVerification')}</span>
                    <p className="text-xs text-muted-foreground">{t('security.emailVerificationDesc')}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {t('security.verified')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <span className="text-sm font-medium text-foreground">{t('security.passwordStrength')}</span>
                    <p className="text-xs text-muted-foreground">{t('security.passwordStrengthDesc')}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {t('security.medium')}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-medium text-foreground">{t('security.loginProtection')}</span>
                    <p className="text-xs text-muted-foreground">{t('security.loginProtectionDesc')}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {t('security.enabled')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
      
      <Footer />
    </div>
  );
}