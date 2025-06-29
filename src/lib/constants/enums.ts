/**
 * 数据库枚举常量定义文件
 * 
 * 此文件包含所有与数据库枚举字段相关的常量定义，确保类型安全和一致性。
 * 所有枚举值必须与 Prisma schema 中定义的枚举值保持一致。
 * 
 * 使用说明：
 * 1. 枚举常量使用 as const 断言确保类型推断的准确性
 * 2. 导出对应的 TypeScript 类型供组件和 API 使用
 * 3. 枚举值采用大写下划线命名规范（SCREAMING_SNAKE_CASE）
 */

/**
 * 交易类型枚举
 * 
 * 用于标识积分交易的不同类型，帮助区分积分的来源和去向
 * 
 * - PURCHASE: 一次性购买获得的积分
 * - SUBSCRIPTION: 订阅服务获得的积分  
 * - SPEND: 消费积分（扣除）
 * - EXPIRE: 积分过期（自动扣除）
 * - BONUS: 奖励积分（活动赠送等）
 * - REFUND: 退款返还的积分
 */
export const TRANSACTION_TYPE = {
  PURCHASE: 'PURCHASE',        // 购买获得
  SUBSCRIPTION: 'SUBSCRIPTION', // 订阅获得
  SPEND: 'SPEND',             // 消费扣除
  EXPIRE: 'EXPIRE',           // 过期扣除
  BONUS: 'BONUS',             // 奖励赠送
  REFUND: 'REFUND',           // 退款返还
} as const;

/**
 * 积分类型枚举
 * 
 * 用于区分积分的获得方式，影响积分的有效期和使用规则
 * 
 * - ONE_TIME: 一次性购买获得的积分，通常有固定有效期
 * - SUBSCRIPTION: 订阅期间获得的积分，可能随订阅状态变化
 */
export const POINT_TYPE = {
  ONE_TIME: 'ONE_TIME',           // 一次性购买积分
  SUBSCRIPTION: 'SUBSCRIPTION',   // 订阅期间积分
} as const;

/**
 * 用户状态枚举
 * 
 * 用于管理用户账户的当前状态，影响用户的登录和功能使用权限
 * 
 * - ACTIVE: 正常活跃状态，可以正常使用所有功能
 * - INACTIVE: 非活跃状态，可能需要重新激活
 * - SUSPENDED: 暂停状态，通常因违规或其他原因被限制使用
 */
export const USER_STATUS = {
  ACTIVE: 'ACTIVE',         // 活跃状态
  INACTIVE: 'INACTIVE',     // 非活跃状态  
  SUSPENDED: 'SUSPENDED',   // 暂停状态
} as const;

/**
 * 订单状态枚举
 * 
 * 用于跟踪支付订单的处理状态，与支付网关（如 Stripe）的状态保持同步
 * 
 * - PENDING: 待处理状态，订单已创建但支付未完成
 * - SUCCEEDED: 支付成功，订单完成
 * - FAILED: 支付失败，需要重新支付或取消
 * - CANCELED: 订单已取消，不会再处理
 * - REFUNDED: 已退款，款项已返还给用户
 */
export const ORDER_STATUS = {
  PENDING: 'PENDING',       // 待处理
  SUCCEEDED: 'SUCCEEDED',   // 支付成功
  FAILED: 'FAILED',         // 支付失败
  CANCELED: 'CANCELED',     // 已取消
  REFUNDED: 'REFUNDED',     // 已退款
} as const;

/**
 * 订阅状态枚举
 * 
 * 用于管理用户订阅服务的状态，直接对应 Stripe 订阅状态
 * 
 * - ACTIVE: 订阅正常，用户可享受订阅服务
 * - CANCELED: 订阅已取消，服务将在当前周期结束后停止
 * - INCOMPLETE: 订阅不完整，通常是首次支付失败
 * - PAST_DUE: 逾期状态，支付失败但仍在宽限期内
 * - UNPAID: 未支付状态，订阅被暂停
 */
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'ACTIVE',           // 正常订阅
  CANCELED: 'CANCELED',       // 已取消
  INCOMPLETE: 'INCOMPLETE',   // 不完整
  PAST_DUE: 'PAST_DUE',      // 逾期
  UNPAID: 'UNPAID',          // 未支付
} as const;

/**
 * 价格类型枚举
 * 
 * 用于区分不同的价格模式，影响支付流程和积分发放逻辑
 * 
 * - ONE_TIME: 一次性购买，单次支付获得永久权益或积分
 * - SUBSCRIPTION: 订阅服务，周期性支付获得持续服务
 * - POINTS_PACKAGE: 积分包，购买特定数量的积分
 */
export const PRICE_TYPE = {
  ONE_TIME: 'ONE_TIME',           // 一次性购买
  SUBSCRIPTION: 'SUBSCRIPTION',   // 订阅服务
  POINTS_PACKAGE: 'POINTS_PACKAGE', // 积分包
} as const;

/**
 * 价格间隔枚举
 * 
 * 用于定义订阅服务的计费周期，仅适用于 SUBSCRIPTION 类型的价格
 * 注意：一次性购买的 interval 字段应为 null
 * 
 * - MONTH: 月订阅，每月收费
 * - YEAR: 年订阅，每年收费
 */
export const PRICE_INTERVAL = {
  MONTH: 'MONTH',   // 月订阅
  YEAR: 'YEAR',     // 年订阅
} as const;

// TypeScript 类型导出
// 这些类型可在组件和 API 中使用，确保类型安全

export type TransactionType = keyof typeof TRANSACTION_TYPE;
export type PointType = keyof typeof POINT_TYPE;
export type UserStatus = keyof typeof USER_STATUS;
export type OrderStatus = keyof typeof ORDER_STATUS;
export type SubscriptionStatus = keyof typeof SUBSCRIPTION_STATUS;
export type PriceType = keyof typeof PRICE_TYPE;
export type PriceInterval = keyof typeof PRICE_INTERVAL;