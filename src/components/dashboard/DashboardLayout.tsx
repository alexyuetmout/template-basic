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
  Shield,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
import { useTranslation } from "@/hooks/useTranslation";
import { usePath } from "@/hooks/usePath";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const createMenuItems = (t: any, routes: any) => [
  {
    title: t('dashboard.navigation.dashboard'),
    href: routes.DASHBOARD,
    icon: User,
    description: t('dashboard.navigation.dashboardDesc')
  },
  {
    title: t('dashboard.navigation.security'),
    href: routes.DASHBOARD_SECURITY,
    icon: Shield,
    description: t('dashboard.navigation.securityDesc')
  },
  {
    title: t('dashboard.navigation.orders'),
    href: routes.DASHBOARD_ORDERS,
    icon: ShoppingBag,
    description: t('dashboard.navigation.ordersDesc')
  },
  {
    title: t('dashboard.navigation.points'),
    href: routes.DASHBOARD_POINTS,
    icon: Coins,
    description: t('dashboard.navigation.pointsDesc')
  },
  {
    title: t('dashboard.navigation.subscriptions'),
    href: routes.DASHBOARD_SUBSCRIPTIONS,
    icon: CreditCard,
    description: t('dashboard.navigation.subscriptionsDesc')
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const { routes } = usePath();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const menuItems = createMenuItems(t, routes);

  useEffect(() => {
    if (!isPending && !session) {
      router.push(routes.SIGN_IN);
      return;
    }
  }, [session, isPending, router]);

  // Show loading state
  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>{t('common.loading')}</span>
        </div>
      </div>
    );
  }

  // If not logged in, don't render content (redirecting)
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
            {/* Sidebar */}
            <div className="lg:col-span-1 bg-gray-50 rounded-l-lg">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  {t('dashboard.title')}
                </h2>
                
                {/* Mobile menu button */}
                <button
                  className="lg:hidden w-full mb-4 p-2 text-left text-gray-600 hover:text-gray-900 border rounded-md"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Settings className="w-4 h-4 inline mr-2" />
                  {t('dashboard.menu')}
                </button>

                {/* Menu list */}
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

            {/* Main content area */}
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