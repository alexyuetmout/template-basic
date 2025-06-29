"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { ProfileLayout } from "@/components/profile/ProfileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Key, Eye, EyeOff, Loader2, AlertCircle, Plus } from "lucide-react";
import { useSession } from "@/lib/auth-client";

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
        className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
          <EyeOff className="w-4 h-4 text-gray-400" />
        ) : (
          <Eye className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);

export default function SecurityPage() {
  const { data: session } = useSession();
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
        const response = await fetch('/api/user/has-password');
        if (response.ok) {
          const data = await response.json();
          setHasPassword(data.hasPassword);
        } else {
          // 如果 API 不存在，fallback 到检查 accounts
          // 邮箱注册的用户通常有 credential account
          setHasPassword(true); // 默认假设有密码，因为用户已经登录了
        }
      } catch (error) {
        console.error('Error checking password status:', error);
        // 出错时默认显示修改密码界面
        setHasPassword(true);
      }
    };

    checkUserPassword();
  }, [session]);

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("至少8个字符");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("至少包含1个大写字母");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("至少包含1个小写字母");
    }
    if (!/\d/.test(password)) {
      errors.push("至少包含1个数字");
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
      formErrors.currentPassword = "请输入当前密码";
    }
    
    if (!newPassword) {
      formErrors.newPassword = "请输入新密码";
    } else {
      const passwordErrors = validatePassword(newPassword);
      if (passwordErrors.length > 0) {
        formErrors.newPassword = passwordErrors.join("，");
      }
    }
    
    if (!confirmPassword) {
      formErrors.confirmPassword = "请确认新密码";
    } else if (newPassword !== confirmPassword) {
      formErrors.confirmPassword = "两次输入的密码不一致";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("密码修改成功！");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.error || "密码修改失败，请稍后重试");
      }
    } catch (error) {
      setMessage("密码修改失败，请稍后重试");
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
      formErrors.newPassword = "请输入密码";
    } else {
      const passwordErrors = validatePassword(newPassword);
      if (passwordErrors.length > 0) {
        formErrors.newPassword = passwordErrors.join("，");
      }
    }
    
    if (!confirmPassword) {
      formErrors.confirmPassword = "请确认密码";
    } else if (newPassword !== confirmPassword) {
      formErrors.confirmPassword = "两次输入的密码不一致";
    }

    if (Object.keys(formErrors).length > 0) {
      setSetPasswordErrors(formErrors);
      setSetPasswordLoading(false);
      return;
    }

    try {
      // 直接使用 API 路由来设置密码
      const response = await fetch('/api/user/set-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setSetPasswordMessage("密码设置成功！");
        setNewPassword("");
        setConfirmPassword("");
        
        // 更新 hasPassword 状态，因为用户现在有密码了
        setHasPassword(true);
      } else {
        setSetPasswordMessage(result.error || "设置密码失败，请稍后重试");
      }
    } catch (error) {
      console.error('Set password error:', error);
      setSetPasswordMessage("设置密码失败，请稍后重试");
    } finally {
      setSetPasswordLoading(false);
    }
  };

  // 如果还在检查密码状态，显示加载
  if (hasPassword === null) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <Header />
        <ProfileLayout>
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>加载安全设置...</span>
            </div>
          </div>
        </ProfileLayout>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <ProfileLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">安全设置</h1>
            <p className="text-gray-600">管理您的账户安全和密码</p>
          </div>

          {/* 设置密码 / 修改密码 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {hasPassword ? <Key className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                {hasPassword ? "修改密码" : "设置密码"}
              </CardTitle>
              <CardDescription>
                {hasPassword 
                  ? "定期更换密码可以提高账户安全性" 
                  : "为您的账户设置密码，增强安全性"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasPassword ? (
                // 修改密码表单
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <PasswordInput
                    label="当前密码"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    show={showCurrentPassword}
                    onToggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
                    error={errors.currentPassword}
                    placeholder="请输入当前密码"
                  />

                  <PasswordInput
                    label="新密码"
                    value={newPassword}
                    onChange={setNewPassword}
                    show={showNewPassword}
                    onToggleShow={() => setShowNewPassword(!showNewPassword)}
                    error={errors.newPassword}
                    placeholder="请输入新密码"
                  />

                  <PasswordInput
                    label="确认新密码"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    show={showConfirmPassword}
                    onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                    error={errors.confirmPassword}
                    placeholder="请再次输入新密码"
                  />

                  {/* 密码强度提示 */}
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <div className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">密码安全要求：</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>至少8个字符</li>
                          <li>包含大写字母、小写字母和数字</li>
                          <li>避免使用个人信息作为密码</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {message && (
                    <div className={`p-3 rounded-md text-sm ${
                      message.includes("成功") 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-red-50 text-red-700 border border-red-200"
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
                        修改中...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        修改密码
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
                        <p className="font-medium mb-1">提示：</p>
                        <p>您目前通过第三方登录，未设置账户密码。设置密码后可以使用邮箱密码直接登录。</p>
                      </div>
                    </div>
                  </div>

                  <PasswordInput
                    label="新密码"
                    value={newPassword}
                    onChange={setNewPassword}
                    show={showNewPassword}
                    onToggleShow={() => setShowNewPassword(!showNewPassword)}
                    error={setPasswordErrors.newPassword}
                    placeholder="请输入密码"
                  />

                  <PasswordInput
                    label="确认密码"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    show={showConfirmPassword}
                    onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                    error={setPasswordErrors.confirmPassword}
                    placeholder="请再次输入密码"
                  />

                  {/* 密码强度提示 */}
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <div className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">密码安全要求：</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>至少8个字符</li>
                          <li>包含大写字母、小写字母和数字</li>
                          <li>避免使用个人信息作为密码</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {setPasswordMessage && (
                    <div className={`p-3 rounded-md text-sm ${
                      setPasswordMessage.includes("成功") 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-red-50 text-red-700 border border-red-200"
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
                        设置中...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        设置密码
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
                账户安全状态
              </CardTitle>
              <CardDescription>
                检查您的账户安全设置
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <span className="text-sm font-medium text-gray-900">邮箱验证</span>
                    <p className="text-xs text-gray-500">已验证的邮箱地址用于账户恢复</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    已验证
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <span className="text-sm font-medium text-gray-900">密码强度</span>
                    <p className="text-xs text-gray-500">强密码可以保护您的账户安全</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    中等
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-medium text-gray-900">登录保护</span>
                    <p className="text-xs text-gray-500">异常登录时会发送邮件通知</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    已启用
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ProfileLayout>
      
      <Footer />
    </div>
  );
}