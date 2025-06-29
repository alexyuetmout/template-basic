"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { ProfileLayout } from "@/components/profile/ProfileLayout";
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

const statusConfig = {
  PENDING: { label: "待支付", color: "bg-yellow-100 text-yellow-800" },
  SUCCEEDED: { label: "已完成", color: "bg-green-100 text-green-800" },
  FAILED: { label: "支付失败", color: "bg-red-100 text-red-800" },
  REFUNDED: { label: "已退款", color: "bg-gray-100 text-gray-800" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    totalPoints: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        
        // 计算统计数据
        const stats = data.reduce((acc: any, order: Order) => {
          acc.totalOrders += 1;
          if (order.status === "SUCCEEDED") {
            acc.totalSpent += order.amount;
            acc.totalPoints += order.pointsAdded;
          }
          return acc;
        }, { totalOrders: 0, totalSpent: 0, totalPoints: 0 });
        
        setStats(stats);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount / 100);
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
            <h1 className="text-2xl font-bold text-gray-900">订单管理</h1>
            <p className="text-gray-600">查看您的购买历史和订单详情</p>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <ShoppingBag className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">总订单数</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">总消费金额</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(stats.totalSpent)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Package className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">获得积分</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalPoints}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 订单列表 */}
          <Card>
            <CardHeader>
              <CardTitle>订单历史</CardTitle>
              <CardDescription>
                您最近的购买记录
              </CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">暂无订单记录</p>
                  <p className="text-sm text-gray-400 mt-1">
                    去购买一些产品吧！
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div 
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {order.price.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              订单号: {order.orderNumber}
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

                      <p className="text-sm text-gray-600 mb-3">
                        {order.price.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4 text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(order.createdAt)}
                          </div>
                          {order.pointsAdded > 0 && (
                            <div className="flex items-center">
                              <Package className="w-4 h-4 mr-1" />
                              +{order.pointsAdded} 积分
                            </div>
                          )}
                        </div>
                        <div className="font-medium text-gray-900">
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
      </ProfileLayout>
      
      <Footer />
    </div>
  );
}