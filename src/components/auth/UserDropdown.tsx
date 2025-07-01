"use client"

import { Avatar } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { useTranslation } from "@/hooks/useTranslation"
import { usePath } from "@/hooks/usePath"

interface UserDropdownProps {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    isAdmin?: boolean
    balance?: number
    oneTimePoints?: number
    subscriptionPoints?: number
    emailVerified?: boolean
    countryCode?: string | null
    stripeCustomerId?: string | null
    status?: string
    createdAt?: string
  }
  className?: string
}

export function UserDropdown({ user, className }: UserDropdownProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const { routes } = usePath()

  // 计算总积分（现在直接从session用户数据获取）
  const totalPoints = (user.balance || 0) + (user.oneTimePoints || 0) + (user.subscriptionPoints || 0)

  // 处理退出登录
  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      router.push(routes.HOME)
      router.refresh()
    } catch (error) {
      console.error('Sign out error:', error)
      window.location.href = "/"
    }
  }

  // 菜单项配置
  const menuItems = [
    { label: t('dashboard.navigation.dashboard'), href: routes.DASHBOARD },
    { label: t('dashboard.navigation.points'), href: routes.DASHBOARD_POINTS },
    { label: t('dashboard.navigation.orders'), href: routes.DASHBOARD_ORDERS },
    { label: t('dashboard.navigation.subscriptions'), href: routes.DASHBOARD_SUBSCRIPTIONS },
    ...(user.isAdmin ? [{ label: t('dashboard.userDropdown.adminPanel'), href: routes.ADMIN }] : []),
    { label: t('dashboard.navigation.security'), href: routes.DASHBOARD_SECURITY },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <button className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-full">
          <Avatar 
            src={user.image}
            name={user.name}
            email={user.email}
            size="md"
            className="cursor-pointer hover:ring-2 hover:ring-blue-500 hover:ring-offset-1 transition-all"
          />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 sm:w-72" 
        align="end" 
        sideOffset={8}
      >
        {/* 用户信息区域 */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3 py-2">
            <Avatar 
              src={user.image}
              name={user.name}
              email={user.email}
              size="md"
            />
            <div className="flex-1 min-w-0">
              <p className="text-base font-medium text-gray-900 truncate">
                {user.name || user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* 积分显示 */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-2 py-1">
            <span className="text-base text-gray-600">{t('dashboard.userDropdown.points')}</span>
            <span className="text-base font-medium text-gray-900">
              {totalPoints.toLocaleString()}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* 导航菜单 */}
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href} className="cursor-pointer text-base">
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* 操作按钮区域 */}
        <DropdownMenuItem asChild>
          <Link href={routes.PRICING} className="cursor-pointer text-base text-blue-600">
            {t('dashboard.userDropdown.upgradePlan')}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="cursor-pointer text-base text-red-600 focus:text-red-600"
        >
          {t('dashboard.userDropdown.signOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}