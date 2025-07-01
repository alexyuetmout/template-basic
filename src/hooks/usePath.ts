'use client'

import { useTranslation } from '@/hooks/useTranslation'
import i18nConfig from '../../i18nConfig'

/**
 * 创建多语言路径的内部函数
 */
function createLocalizedPath(path: string | undefined, currentLocale: string) {
  // 处理空值
  if (!path) {
    console.warn('usePath received undefined path')
    return '/'
  }
  
  // 处理特殊链接，直接返回
  if (path.startsWith('http') || 
      path.startsWith('#') || 
      path.startsWith('mailto:') || 
      path.startsWith('tel:')) {
    return path
  }
  
  // 默认语言不添加前缀
  if (currentLocale === i18nConfig.defaultLocale) {
    return path
  }
  
  // 其他语言添加前缀
  return `/${currentLocale}${path}`
}

/**
 * 多语言路由 Hook
 * 返回路径处理函数和所有常用路由的多语言版本
 */
export function usePath() {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language
  
  const path = (route: string | undefined) => createLocalizedPath(route, currentLocale)
  
  return {
    // 路径处理函数（保持向后兼容）
    path,
    
    // 常用路由常量
    routes: {
      // 首页和主要页面
      HOME: path('/'),
      PRICING: path('/pricing'),
      BLOG: path('/blog'),
      
      // 认证相关
      SIGN_IN: path('/auth/sign-in'),
      SIGN_UP: path('/auth/sign-up'),
      FORGOT_PASSWORD: path('/auth/forgot-password'),
      AUTH_ERROR: path('/auth/error'),
      
      // 仪表板
      DASHBOARD: path('/dashboard'),
      DASHBOARD_ORDERS: path('/dashboard/orders'),
      DASHBOARD_POINTS: path('/dashboard/points'),
      DASHBOARD_SUBSCRIPTIONS: path('/dashboard/subscriptions'),
      DASHBOARD_SECURITY: path('/dashboard/security'),
      
      // 特殊页面
      DEMO: path('/demo'),
      TERMS: path('/terms'),
      PRIVACY: path('/privacy'),
      COOKIES: path('/cookies'),
      
      // 管理员
      ADMIN: path('/admin'),
    }
  }
}