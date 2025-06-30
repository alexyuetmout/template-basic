"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
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

const statusConfig = {
  ACTIVE: { 
    label: "活跃", 
    color: "bg-green-100 text-green-800",
    icon: CheckCircle
  },
  CANCELED: { 
    label: "已取消", 
    color: "bg-gray-100 text-gray-800",
    icon: X
  },
  PAST_DUE: { 
    label: "逾期", 
    color: "bg-red-100 text-red-800",
    icon: AlertCircle
  },
  INCOMPLETE: { 
    label: "未完成", 
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock
  },
  UNPAID: { 
    label: "未支付", 
    color: "bg-red-100 text-red-800",
    icon: AlertCircle
  },
};

export default function SubscriptionsPage() {
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
    if (!confirm("确定要取消这个订阅吗？取消后将在当前计费周期结束时停止服务。")) {
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
        alert("订阅取消成功！服务将在当前计费周期结束时停止。");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "取消订阅失败，请稍后重试");
      }
    } catch (error) {
      alert("取消订阅失败，请稍后重试");
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
      <div className="min-h-screen bg-white dark:bg-neutral-900">
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
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">订阅管理</h1>
            <p className="text-gray-600">管理您的订阅计划和计费信息</p>
          </div>

          {/* 活跃订阅 */}
          {activeSubscriptions.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">活跃订阅</h2>
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
                              <Icon className="w-5 h-5 text-green-600" />
                              <h3 className="text-lg font-semibold text-gray-900">
                                {subscription.price.name}
                              </h3>
                              <Badge className={config?.color}>
                                {config?.label}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-4">
                              {subscription.price.description}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">价格</span>
                                <p className="font-medium text-gray-900">
                                  {formatCurrency(subscription.price.amount, subscription.price.currency)} / {getIntervalText(subscription.price.interval)}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">当前周期</span>
                                <p className="font-medium text-gray-900">
                                  {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-500">下次扣费</span>
                                <p className="font-medium text-gray-900">
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
                                  取消中...
                                </>
                              ) : (
                                <>
                                  <X className="w-4 h-4 mr-2" />
                                  取消订阅
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
              <h2 className="text-lg font-semibold text-gray-900 mb-4">历史订阅</h2>
              <div className="space-y-4">
                {inactiveSubscriptions.map((subscription) => {
                  const config = statusConfig[subscription.status as keyof typeof statusConfig];
                  const Icon = config?.icon || CreditCard;
                  
                  return (
                    <Card key={subscription.id} className="border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <Icon className="w-5 h-5 text-gray-600" />
                              <h3 className="text-lg font-semibold text-gray-900">
                                {subscription.price.name}
                              </h3>
                              <Badge className={config?.color}>
                                {config?.label}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-4">
                              {subscription.price.description}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">订阅时间</span>
                                <p className="font-medium text-gray-900">
                                  {formatDate(subscription.createdAt)}
                                </p>
                              </div>
                              {subscription.canceledAt && (
                                <div>
                                  <span className="text-gray-500">取消时间</span>
                                  <p className="font-medium text-gray-900">
                                    {formatDate(subscription.canceledAt)}
                                  </p>
                                </div>
                              )}
                              {subscription.cancellationReason && (
                                <div>
                                  <span className="text-gray-500">取消原因</span>
                                  <p className="font-medium text-gray-900">
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
                <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">暂无订阅</h3>
                <p className="text-gray-600 mb-4">
                  您还没有任何订阅计划
                </p>
                <Button asChild>
                  <Link href="/pricing">
                    查看订阅计划
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 订阅说明 */}
          <Card>
            <CardHeader>
              <CardTitle>订阅说明</CardTitle>
              <CardDescription>
                关于订阅管理的重要信息
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">取消政策</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 可随时取消订阅</li>
                    <li>• 取消后服务持续到周期结束</li>
                    <li>• 不会产生额外费用</li>
                    <li>• 可重新订阅恢复服务</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">计费说明</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 自动续费扣款</li>
                    <li>• 扣费失败会暂停服务</li>
                    <li>• 支持更换支付方式</li>
                    <li>• 可升级或降级计划</li>
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