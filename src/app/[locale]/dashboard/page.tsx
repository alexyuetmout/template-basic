"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Save, Loader2 } from "lucide-react";
import { updateUser, useSession } from "@/lib/auth-client";
import { useTranslation } from "@/hooks/useTranslation";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const { t } = useTranslation('dashboard');
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
        setMessage(error.message || t('profile.updateFailed'));
      } else {
        setMessage(t('profile.updateSuccess'));
      }
    } catch (error) {
      setMessage(t('profile.updateFailed'));
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-background dark:bg-background">
        <Header />
        <DashboardLayout>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" />
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
            <h1 className="text-2xl font-bold text-foreground">{t('profile.title')}</h1>
            <p className="text-muted-foreground">{t('profile.description')}</p>
          </div>

          {/* Basic Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t('profile.basicInformation')}
              </CardTitle>
              <CardDescription>
                {t('profile.updateProfileInfo')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('profile.username')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t('profile.enterUsername')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('profile.emailAddress')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={session?.user?.email || ""}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-muted-foreground cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('profile.emailCannotChange')}
                  </p>
                </div>

                {message && (
                  <div className={`p-3 rounded-md text-sm ${
                    message.includes(t('profile.updateSuccess')) 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-destructive/5 text-red-700 border border-destructive/30"
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
                      {t('profile.saving')}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {t('profile.saveChanges')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Account Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                {t('profile.accountInformation')}
              </CardTitle>
              <CardDescription>
                {t('profile.accountBasicInfo')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-muted-foreground">{t('profile.userId')}</span>
                  <span className="text-sm text-foreground font-mono">{session?.user?.id}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-muted-foreground">{t('profile.registrationDate')}</span>
                  <span className="text-sm text-foreground">
                    {session?.user?.createdAt ? new Date(session.user.createdAt).toLocaleDateString("en-US") : "-"}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-muted-foreground">{t('profile.accountStatus')}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {t('profile.active')}
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