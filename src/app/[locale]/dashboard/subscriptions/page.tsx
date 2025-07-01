"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { usePath } from "@/hooks/usePath";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  X, 
  Loader2, 
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface Subscription {
  id: string;
  subscriptionType: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  canceledAt: string | null;
  cancellationReason: string | null;
  stripeSubscriptionId: string;
  createdAt: string;
  price: {
    name: string;
    description: string;
    amount: number;
    interval: string;
    currency: string;
  };
}

const getStatusConfig = (t: any) => ({
  ACTIVE: { 
    label: t('subscriptions.status.active'), 
    color: "bg-green-100 text-green-800",
    icon: CheckCircle
  },
  CANCELED: { 
    label: t('subscriptions.status.cancelled'), 
    color: "bg-gray-100 text-gray-800",
    icon: X
  },
  PAST_DUE: { 
    label: t('subscriptions.status.expired'), 
    color: "bg-red-100 text-red-800",
    icon: AlertCircle
  },
  INCOMPLETE: { 
    label: t('subscriptions.status.expired'), 
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock
  },
  UNPAID: { 
    label: t('subscriptions.status.expired'), 
    color: "bg-red-100 text-red-800",
    icon: AlertCircle
  },
});

export default function SubscriptionsPage() {
  const { routes } = usePath();
  const { t } = useTranslation('dashboard');
  const statusConfig = getStatusConfig(t);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch("/api/checkout/subscription");
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data);
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!confirm(t('subscriptions.confirmCancel'))) {
      return;
    }

    setCancelingId(subscriptionId);
    
    try {
      const response = await fetch("/api/subscriptions/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId }),
      });

      if (response.ok) {
        // 刷新订阅列表
        await fetchSubscriptions();
        alert(t('subscriptions.cancelSuccess'));
      } else {
        const errorData = await response.json();
        alert(errorData.error || t('subscriptions.cancelFailed'));
      }
    } catch (error) {
      alert(t('subscriptions.cancelFailed'));
    } finally {
      setCancelingId(null);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getIntervalText = (interval: string) => {
    switch (interval) {
      case "month": return "月";
      case "year": return "年";
      case "week": return "周";
      default: return interval;
    }
  };

  if (loading) {
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

  const activeSubscriptions = subscriptions.filter(sub => sub.status === "ACTIVE");
  const inactiveSubscriptions = subscriptions.filter(sub => sub.status !== "ACTIVE");

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Header />
      
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('subscriptions.title')}</h1>
            <p className="text-muted-foreground">{t('subscriptions.description')}</p>
          </div>

          {/* 活跃订阅 */}
          {activeSubscriptions.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">{t('subscriptions.activeSubscriptions')}</h2>
              <div className="space-y-4">
                {activeSubscriptions.map((subscription) => {
                  const config = statusConfig[subscription.status as keyof typeof statusConfig];
                  const Icon = config?.icon || CreditCard;
                  
                  return (
                    <Card key={subscription.id} className="border-green-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Icon className="w-5 h-5 text-chart-2" />
                              <h3 className="text-lg font-semibold text-foreground">
                                {subscription.price.name}
                              </h3>
                              <Badge className={config?.color}>
                                {config?.label}
                              </Badge>
                            </div>
                            
                            <p className="text-muted-foreground mb-4">
                              {subscription.price.description}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">{t('subscriptions.price')}</span>
                                <p className="font-medium text-foreground">
                                  {formatCurrency(subscription.price.amount, subscription.price.currency)} / {getIntervalText(subscription.price.interval)}
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">{t('subscriptions.currentPeriod')}</span>
                                <p className="font-medium text-foreground">
                                  {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                                </p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">{t('subscriptions.nextBilling')}</span>
                                <p className="font-medium text-foreground">
                                  {formatDate(subscription.currentPeriodEnd)}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="ml-4">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelSubscription(subscription.id)}
                              disabled={cancelingId === subscription.id}
                            >
                              {cancelingId === subscription.id ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  {t('subscriptions.cancelling')}
                                </>
                              ) : (
                                <>
                                  <X className="w-4 h-4 mr-2" />
                                  {t('subscriptions.cancelSubscription')}
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* 历史订阅 */}
          {inactiveSubscriptions.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">{t('subscriptions.historySubscriptions')}</h2>
              <div className="space-y-4">
                {inactiveSubscriptions.map((subscription) => {
                  const config = statusConfig[subscription.status as keyof typeof statusConfig];
                  const Icon = config?.icon || CreditCard;
                  
                  return (
                    <Card key={subscription.id} className="border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Icon className="w-5 h-5 text-muted-foreground" />
                              <h3 className="text-lg font-semibold text-foreground">
                                {subscription.price.name}
                              </h3>
                              <Badge className={config?.color}>
                                {config?.label}
                              </Badge>
                            </div>
                            
                            <p className="text-muted-foreground mb-4">
                              {subscription.price.description}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">{t('subscriptions.subscriptionTime')}</span>
                                <p className="font-medium text-foreground">
                                  {formatDate(subscription.createdAt)}
                                </p>
                              </div>
                              {subscription.canceledAt && (
                                <div>
                                  <span className="text-muted-foreground">{t('subscriptions.cancelTime')}</span>
                                  <p className="font-medium text-foreground">
                                    {formatDate(subscription.canceledAt)}
                                  </p>
                                </div>
                              )}
                              {subscription.cancellationReason && (
                                <div>
                                  <span className="text-muted-foreground">{t('subscriptions.cancelReason')}</span>
                                  <p className="font-medium text-foreground">
                                    {subscription.cancellationReason}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* 无订阅状态 */}
          {subscriptions.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">{t('subscriptions.noSubscriptions')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('subscriptions.noSubscriptionsDesc')}
                </p>
                <Button asChild>
                  <Link href={routes.PRICING}>
                    {t('subscriptions.viewPlans')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 订阅说明 */}
          <Card>
            <CardHeader>
              <CardTitle>{t('subscriptions.help.title')}</CardTitle>
              <CardDescription>
                {t('subscriptions.help.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">{t('subscriptions.help.cancellationPolicy')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {(t('subscriptions.help.policies', { returnObjects: true }) as string[]).map((policy: string, index: number) => (
                      <li key={index}>{policy}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">{t('subscriptions.help.billing')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {(t('subscriptions.help.billingInfo', { returnObjects: true }) as string[]).map((info: string, index: number) => (
                      <li key={index}>{info}</li>
                    ))}
                  </ul>
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