"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  User, 
  ShoppingBag, 
  Coins, 
  CreditCard,
  Settings,
  Bell,
  Shield,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: "个人信息",
    href: "/profile",
    icon: User,
    description: "管理您的个人资料"
  },
  {
    title: "安全设置",
    href: "/profile/security",
    icon: Shield,
    description: "修改密码和安全设置"
  },
  {
    title: "订单管理",
    href: "/profile/orders",
    icon: ShoppingBag,
    description: "查看购买历史"
  },
  {
    title: "积分中心",
    href: "/profile/points",
    icon: Coins,
    description: "积分使用和历史"
  },
  {
    title: "订阅管理",
    href: "/profile/subscriptions",
    icon: CreditCard,
    description: "管理您的订阅"
  },
  {
    title: "通知设置",
    href: "/profile/notifications",
    icon: Bell,
    description: "邮件和通知偏好"
  },
];

export function ProfileLayout({ children }: ProfileLayoutProps) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth/sign-in");
      return;
    }
  }, [session, isPending, router]);

  // 显示加载状态
  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>加载中...</span>
        </div>
      </div>
    );
  }

  // 如果没有登录，不渲染内容（重定向中）
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
            {/* 侧边栏 */}
            <div className="lg:col-span-1 bg-gray-50 rounded-l-lg">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  个人中心
                </h2>
                
                {/* 移动端菜单按钮 */}
                <button
                  className="lg:hidden w-full mb-4 p-2 text-left text-gray-600 hover:text-gray-900 border rounded-md"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  菜单
                </button>

                {/* 菜单列表 */}
                <nav className={cn(
                  "space-y-1",
                  isMobileMenuOpen ? "block" : "hidden lg:block"
                )}>
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-start p-3 rounded-md text-sm transition-colors",
                          isActive
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className={cn(
                          "w-5 h-5 mr-3 flex-shrink-0 mt-0.5",
                          isActive ? "text-blue-700" : "text-gray-400"
                        )} />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* 主内容区域 */}
            <div className="lg:col-span-3">
              <div className="p-6 lg:p-8">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}