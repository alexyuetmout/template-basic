"use client";

import { useState } from "react";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { ProfileLayout } from "@/components/profile/ProfileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Key, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <ProfileLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">安全设置</h1>
            <p className="text-gray-600">管理您的账户安全和密码</p>
          </div>

          {/* 修改密码 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                修改密码
              </CardTitle>
              <CardDescription>
                定期更换密码可以提高账户安全性
              </CardDescription>
            </CardHeader>
            <CardContent>
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