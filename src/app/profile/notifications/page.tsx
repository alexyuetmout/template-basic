"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { ProfileLayout } from "@/components/profile/ProfileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Mail, Save, Loader2 } from "lucide-react";

interface NotificationSettings {
  emailMarketing: boolean;
  emailSecurity: boolean;
  emailBilling: boolean;
  emailProducts: boolean;
  pushMarketing: boolean;
  pushSecurity: boolean;
  pushBilling: boolean;
  pushProducts: boolean;
}

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailMarketing: false,
    emailSecurity: true,
    emailBilling: true,
    emailProducts: true,
    pushMarketing: false,
    pushSecurity: true,
    pushBilling: true,
    pushProducts: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/user/notifications");
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error("Error fetching notification settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/user/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setMessage("通知设置已保存");
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "保存失败，请稍后重试");
      }
    } catch (error) {
      setMessage("保存失败，请稍后重试");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (key: keyof NotificationSettings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const ToggleSwitch = ({ 
    checked, 
    onChange, 
    disabled = false 
  }: { 
    checked: boolean; 
    onChange: () => void; 
    disabled?: boolean;
  }) => (
    <button
      type="button"
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked 
          ? "bg-blue-600" 
          : "bg-gray-200"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <Header />
        <ProfileLayout>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
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
            <h1 className="text-2xl font-bold text-gray-900">通知设置</h1>
            <p className="text-gray-600">管理您的邮件和推送通知偏好</p>
          </div>

          {/* 邮件通知 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                邮件通知
              </CardTitle>
              <CardDescription>
                选择您希望接收的邮件通知类型
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-gray-900">安全通知</h4>
                  <p className="text-sm text-gray-500">
                    登录、密码更改等安全相关通知
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.emailSecurity}
                  onChange={() => handleToggle("emailSecurity")}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-gray-900">账单通知</h4>
                  <p className="text-sm text-gray-500">
                    付款确认、发票、订阅变更等
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.emailBilling}
                  onChange={() => handleToggle("emailBilling")}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-gray-900">产品更新</h4>
                  <p className="text-sm text-gray-500">
                    新功能、维护通知、使用技巧等
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.emailProducts}
                  onChange={() => handleToggle("emailProducts")}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-gray-900">营销推广</h4>
                  <p className="text-sm text-gray-500">
                    促销活动、特别优惠、产品推荐等
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.emailMarketing}
                  onChange={() => handleToggle("emailMarketing")}
                />
              </div>
            </CardContent>
          </Card>

          {/* 推送通知 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                推送通知
              </CardTitle>
              <CardDescription>
                管理浏览器推送通知设置
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-gray-900">安全提醒</h4>
                  <p className="text-sm text-gray-500">
                    重要安全事件的即时推送
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.pushSecurity}
                  onChange={() => handleToggle("pushSecurity")}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-gray-900">账单提醒</h4>
                  <p className="text-sm text-gray-500">
                    付款到期、订阅变更等提醒
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.pushBilling}
                  onChange={() => handleToggle("pushBilling")}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-gray-900">产品通知</h4>
                  <p className="text-sm text-gray-500">
                    新功能发布、重要更新等
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.pushProducts}
                  onChange={() => handleToggle("pushProducts")}
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-gray-900">营销推送</h4>
                  <p className="text-sm text-gray-500">
                    促销活动、限时优惠等推送
                  </p>
                </div>
                <ToggleSwitch
                  checked={settings.pushMarketing}
                  onChange={() => handleToggle("pushMarketing")}
                />
              </div>
            </CardContent>
          </Card>

          {/* 保存按钮 */}
          {message && (
            <div className={`p-3 rounded-md text-sm ${
              message.includes("已保存") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message}
            </div>
          )}

          <div className="flex justify-end">
            <Button 
              onClick={handleSaveSettings}
              disabled={saving}
              className="min-w-[120px]"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  保存中...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  保存设置
                </>
              )}
            </Button>
          </div>

          {/* 通知说明 */}
          <Card>
            <CardHeader>
              <CardTitle>通知说明</CardTitle>
              <CardDescription>
                关于通知设置的重要信息
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">重要提醒</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 安全通知建议保持开启</li>
                    <li>• 账单通知确保及时付款</li>
                    <li>• 可随时修改通知设置</li>
                    <li>• 某些重要通知无法关闭</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">推送通知</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 需要浏览器授权</li>
                    <li>• 支持桌面和移动设备</li>
                    <li>• 可在浏览器设置中管理</li>
                    <li>• 不会影响邮件通知</li>
                  </ul>
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