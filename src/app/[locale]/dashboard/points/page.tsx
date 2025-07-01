"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Calendar,
  Gift,
  Loader2,
  Clock,
} from "lucide-react";

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

const getTransactionTypeConfig = (t: any) => ({
  PURCHASE: {
    label: t("points.transactionTypes.PURCHASE"),
    color: "bg-green-100 text-green-800",
    icon: TrendingUp,
  },
  SUBSCRIPTION: {
    label: t("points.transactionTypes.SUBSCRIPTION"),
    color: "bg-blue-100 text-blue-800",
    icon: Gift,
  },
  SPEND: {
    label: t("points.transactionTypes.SPEND"),
    color: "bg-red-100 text-red-800",
    icon: TrendingDown,
  },
  EXPIRE: {
    label: t("points.transactionTypes.EXPIRE"),
    color: "bg-gray-100 text-gray-800",
    icon: Clock,
  },
  REFUND: {
    label: t("points.transactionTypes.REFUND"),
    color: "bg-yellow-100 text-yellow-800",
    icon: TrendingDown,
  },
});

export default function PointsPage() {
  const { t } = useTranslation("dashboard");
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
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatExpiryDate = (dateString: string | null) => {
    if (!dateString) return t("points.expiry.neverExpires");

    const expiryDate = new Date(dateString);
    const now = new Date();
    const diffTime = expiryDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return t("points.expiry.expired");
    } else if (diffDays <= 30) {
      return t("points.expiry.daysLeft", { days: diffDays });
    } else {
      return expiryDate.toLocaleDateString();
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
            <h1 className="text-2xl font-bold text-gray-900">
              {t("points.title")}
            </h1>
            <p className="text-gray-600">{t("points.description")}</p>
          </div>

          {/* 积分概览 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Coins className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {t("points.overview.totalPoints")}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {balance.totalPoints}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {t("points.overview.availablePoints")}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {balance.availablePoints}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      {t("points.overview.expiringSoon")}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {balance.expiringSoon}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("points.overview.within30Days")}
                    </p>
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
                      {t("points.expiryWarning.title")}
                    </p>
                    <p className="text-sm text-orange-700">
                      {t("points.expiryWarning.message", {
                        count: balance.expiringSoon,
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 积分交易记录 */}
          <Card>
            <CardHeader>
              <CardTitle>{t("points.history.title")}</CardTitle>
              <CardDescription>
                {t("points.history.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <Coins className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {t("points.history.noRecords")}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {t("points.history.noRecordsDesc")}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => {
                    const transactionTypeConfig = getTransactionTypeConfig(t);
                    const config =
                      transactionTypeConfig[
                        transaction.transactionType as keyof typeof transactionTypeConfig
                      ];
                    const Icon = config?.icon || Coins;
                    const isPositive =
                      transaction.transactionType === "PURCHASE" ||
                      transaction.transactionType === "SUBSCRIPTION";

                    return (
                      <div
                        key={transaction.id}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2 rounded-full ${
                                isPositive ? "bg-green-100" : "bg-red-100"
                              }`}
                            >
                              <Icon
                                className={`w-4 h-4 ${
                                  isPositive ? "text-green-600" : "text-red-600"
                                }`}
                              />
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
                            <div
                              className={`text-lg font-bold ${
                                isPositive ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {isPositive ? "+" : "-"}
                              {Math.abs(transaction.points)}
                            </div>
                            <Badge
                              className={
                                config?.color || "bg-gray-100 text-gray-800"
                              }
                            >
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
                              <span>
                                {t("points.history.orderNumber", {
                                  orderNumber: transaction.order.orderNumber,
                                })}
                              </span>
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
              <CardTitle>{t("points.information.title")}</CardTitle>
              <CardDescription>
                {t("points.information.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {t("points.information.howToEarn.title")}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {(
                      t("points.information.howToEarn.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    {t("points.information.usageRules.title")}
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {(
                      t("points.information.usageRules.items", {
                        returnObjects: true,
                      }) as string[]
                    ).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
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
