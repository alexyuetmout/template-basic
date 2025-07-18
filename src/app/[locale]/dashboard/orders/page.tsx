"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useApiClient } from "@/lib/api-client";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Calendar, DollarSign, Package, Loader2 } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  amount: number;
  status: string;
  pointsAdded: number;
  createdAt: string;
  price: {
    name: string;
    description: string;
  };
}

const getStatusConfig = (t: any) => ({
  PENDING: { label: t('dashboard:orders.status.pending'), color: "bg-yellow-100 text-yellow-800" },
  SUCCEEDED: { label: t('dashboard:orders.status.succeeded'), color: "bg-green-100 text-green-800" },
  FAILED: { label: t('dashboard:orders.status.failed'), color: "bg-red-100 text-red-800" },
  REFUNDED: { label: t('dashboard:orders.status.refunded'), color: "bg-gray-100 text-gray-800" },
});

export default function DashboardOrdersPage() {
  const { t } = useTranslation();
  const { apiGet } = useApiClient();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    totalPoints: 0,
  });

  const statusConfig = getStatusConfig(t);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await apiGet("/api/orders");
      setOrders(data);
      
      // Calculate statistics
      const stats = data.reduce((acc: any, order: Order) => {
        acc.totalOrders += 1;
        if (order.status === "SUCCEEDED") {
          acc.totalSpent += order.amount;
          acc.totalPoints += order.pointsAdded;
        }
        return acc;
      }, { totalOrders: 0, totalSpent: 0, totalPoints: 0 });
      
      setStats(stats);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [apiGet]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Header />
      
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('dashboard:orders.title')}</h1>
            <p className="text-muted-foreground">{t('dashboard:orders.description')}</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">{t('dashboard:orders.stats.totalOrders')}</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-chart-2" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">{t('dashboard:orders.stats.totalSpent')}</p>
                    <p className="text-2xl font-bold text-foreground">
                      {formatCurrency(stats.totalSpent)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-chart-4" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">{t('dashboard:orders.stats.pointsEarned')}</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalPoints}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order List */}
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard:orders.orderHistory.title')}</CardTitle>
              <CardDescription>
                {t('dashboard:orders.orderHistory.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">{t('dashboard:orders.empty.noOrders')}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('dashboard:orders.empty.purchaseProducts')}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id}
                      className="border border-border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-medium text-foreground">
                              {order.price.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {t('dashboard:orders.orderHistory.orderNumber', { orderNumber: order.orderNumber })}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={
                            statusConfig[order.status as keyof typeof statusConfig]?.color || 
                            "bg-gray-100 text-gray-800"
                          }
                        >
                          {statusConfig[order.status as keyof typeof statusConfig]?.label || order.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {order.price.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4 text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(order.createdAt)}
                          </div>
                          {order.pointsAdded > 0 && (
                            <div className="flex items-center">
                              <Package className="w-4 h-4 mr-1" />
                              {t('dashboard:orders.orderHistory.pointsAdded', { points: order.pointsAdded })}
                            </div>
                          )}
                        </div>
                        <div className="font-medium text-foreground">
                          {formatCurrency(order.amount)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
      
      <Footer />
    </div>
  );
}