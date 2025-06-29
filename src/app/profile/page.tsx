"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { ProfileLayout } from "@/components/profile/ProfileLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Save, Loader2 } from "lucide-react";
import { updateUser, useSession } from "@/lib/auth-client";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const { data, error } = await updateUser({
        name,
      });

      if (error) {
        setMessage(error.message || "更新失败，请稍后重试");
      } else {
        setMessage("个人信息更新成功！");
      }
    } catch (error) {
      setMessage("更新失败，请稍后重试");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
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
            <h1 className="text-2xl font-bold text-gray-900">个人信息</h1>
            <p className="text-gray-600">管理您的个人资料和账户信息</p>
          </div>

          {/* 基本信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                基本信息
              </CardTitle>
              <CardDescription>
                更新您的个人资料信息
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    用户名
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="请输入您的用户名"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    邮箱地址
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={session?.user?.email || ""}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    邮箱地址无法修改，如需更换请联系客服
                  </p>
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
                  disabled={saving}
                  className="w-full sm:w-auto"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      保存中...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      保存更改
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* 账户信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                账户信息
              </CardTitle>
              <CardDescription>
                您的账户基本信息
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">用户ID</span>
                  <span className="text-sm text-gray-900 font-mono">{session?.user?.id}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">注册时间</span>
                  <span className="text-sm text-gray-900">
                    {session?.user?.createdAt ? new Date(session.user.createdAt).toLocaleDateString("zh-CN") : "-"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-600">账户状态</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    正常
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