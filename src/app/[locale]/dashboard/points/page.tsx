"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, TrendingDown, Calendar, Gift, Loader2, Clock } from "lucide-react";

interface PointTransaction {
  id: string;
  points: number;
  pointType: string;
  transactionType: string;
  reason: string;
  description: string;
  expiresAt: string | null;
  createdAt: string;
  order?: {
    orderNumber: string;
  };
  subscription?: {
    id: string;
  };
}

interface PointsBalance {
  totalPoints: number;
  availablePoints: number;
  expiringSoon: number; // 30天内过期的积分
}

const transactionTypeConfig = {
  PURCHASE: { 
    label: "Purchase", 
    color: "bg-green-100 text-green-800",
    icon: TrendingUp
  },
  SUBSCRIPTION: { 
    label: "Subscription", 
    color: "bg-blue-100 text-blue-800",
    icon: Gift
  },
  SPEND: { 
    label: "Spent", 
    color: "bg-red-100 text-red-800",
    icon: TrendingDown
  },
  EXPIRE: { 
    label: "Expired", 
    color: "bg-gray-100 text-gray-800",
    icon: Clock
  },
  REFUND: { 
    label: "Refund", 
    color: "bg-yellow-100 text-yellow-800",
    icon: TrendingDown
  },
};

export default function PointsPage() {
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);
  const [balance, setBalance] = useState<PointsBalance>({
    totalPoints: 0,
    availablePoints: 0,
    expiringSoon: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPointsData();
  }, []);

  const fetchPointsData = async () => {
    try {
      // 获取积分余额
      const balanceResponse = await fetch("/api/points/balance");
      if (balanceResponse.ok) {
        const balanceData = await balanceResponse.json();
        setBalance(balanceData);
      }

      // 获取积分交易记录
      const transactionsResponse = await fetch("/api/points/transactions");
      if (transactionsResponse.ok) {
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData);
      }
    } catch (error) {
      console.error("Error fetching points data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatExpiryDate = (dateString: string | null) => {
    if (!dateString) return "永不过期";
    
    const expiryDate = new Date(dateString);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) {
      return "已过期";
    } else if (diffDays <= 30) {
      return `${diffDays}天后过期`;
    } else {
      return expiryDate.toLocaleDateString("zh-CN");
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

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Points Center</h1>
            <p className="text-gray-600">View your points balance and usage history</p>
          </div>

          {/* 积分概览 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Coins className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">总积分</p>
                    <p className="text-2xl font-bold text-gray-900">{balance.totalPoints}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">可用积分</p>
                    <p className="text-2xl font-bold text-gray-900">{balance.availablePoints}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">即将过期</p>
                    <p className="text-2xl font-bold text-gray-900">{balance.expiringSoon}</p>
                    <p className="text-xs text-gray-500">30天内</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 积分使用提醒 */}
          {balance.expiringSoon > 0 && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-orange-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-orange-800">
                      积分过期提醒
                    </p>
                    <p className="text-sm text-orange-700">
                      您有 {balance.expiringSoon} 积分将在30天内过期，请及时使用
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 积分交易记录 */}
          <Card>
            <CardHeader>
              <CardTitle>积分记录</CardTitle>
              <CardDescription>
                您的积分获得和使用历史
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <Coins className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">暂无积分记录</p>
                  <p className="text-sm text-gray-400 mt-1">
                    购买产品或订阅服务即可获得积分
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => {
                    const config = transactionTypeConfig[transaction.transactionType as keyof typeof transactionTypeConfig];
                    const Icon = config?.icon || Coins;
                    const isPositive = transaction.transactionType === "PURCHASE" || transaction.transactionType === "SUBSCRIPTION";
                    
                    return (
                      <div 
                        key={transaction.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${isPositive ? "bg-green-100" : "bg-red-100"}`}>
                              <Icon className={`w-4 h-4 ${isPositive ? "text-green-600" : "text-red-600"}`} />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {transaction.reason}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {transaction.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
                              {isPositive ? "+" : "-"}{Math.abs(transaction.points)}
                            </div>
                            <Badge className={config?.color || "bg-gray-100 text-gray-800"}>
                              {config?.label || transaction.transactionType}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(transaction.createdAt)}
                            </div>
                            {transaction.order && (
                              <span>订单: {transaction.order.orderNumber}</span>
                            )}
                          </div>
                          {transaction.expiresAt && (
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatExpiryDate(transaction.expiresAt)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 积分说明 */}
          <Card>
            <CardHeader>
              <CardTitle>积分说明</CardTitle>
              <CardDescription>
                了解积分的获得和使用规则
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">如何获得积分</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 购买产品或服务</li>
                    <li>• 订阅月度或年度计划</li>
                    <li>• 参与活动和推广</li>
                    <li>• 邀请好友注册</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">积分使用规则</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 积分可用于购买产品</li>
                    <li>• 1积分 = $0.01</li>
                    <li>• 积分有效期为1年</li>
                    <li>• 过期积分将自动清零</li>
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