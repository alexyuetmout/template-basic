/**
 * 应用路由配置
 * 统一管理所有内部路由路径，便于维护和多语言支持
 */

// 主要页面路由
export const ROUTES = {
  // 首页和主要页面
  HOME: '/',
  PRICING: '/pricing',
  BLOG: '/blog',
  
  // 认证相关
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  
  // 仪表板
  DASHBOARD: '/dashboard',
  DASHBOARD_ORDERS: '/dashboard/orders',
  DASHBOARD_POINTS: '/dashboard/points',
  DASHBOARD_SUBSCRIPTIONS: '/dashboard/subscriptions',
  DASHBOARD_SECURITY: '/dashboard/security',
  
  // 特殊页面
  DEMO: '/demo',
  
  // API路由
  API: {
    AUTH: '/api/auth',
    ORDERS: '/api/orders',
    CHECKOUT: {
      PAYMENT: '/api/checkout/payment',
      SUBSCRIPTION: '/api/checkout/subscription',
    },
    SUBSCRIPTIONS: {
      CANCEL: '/api/subscriptions/cancel',
    },
  },
} as const

// Pricing计划的CTA路由配置
export const PRICING_CTA_ROUTES = {
  BASIC: ROUTES.SIGN_UP,      // 基础计划 → 注册页面
  COMPLETE: ROUTES.PRICING,    // 完整课程 → 定价页面
  ADVANCED: ROUTES.DEMO,       // 高级计划 → 演示页面
} as const

// 导出类型以便TypeScript类型检查
export type RouteKey = keyof typeof ROUTES
export type PricingCtaRouteKey = keyof typeof PRICING_CTA_ROUTES