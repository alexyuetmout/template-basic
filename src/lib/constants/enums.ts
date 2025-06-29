// Database enum constants to ensure type safety and consistency

export const TRANSACTION_TYPE = {
  PURCHASE: 'PURCHASE',
  SUBSCRIPTION: 'SUBSCRIPTION', 
  SPEND: 'SPEND',
  EXPIRE: 'EXPIRE',
  BONUS: 'BONUS',
  REFUND: 'REFUND',
} as const;

export const POINT_TYPE = {
  ONE_TIME: 'ONE_TIME',
  SUBSCRIPTION: 'SUBSCRIPTION',
} as const;

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
} as const;

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  CANCELED: 'CANCELED',
  REFUNDED: 'REFUNDED',
} as const;

export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'ACTIVE',
  CANCELED: 'CANCELED',
  INCOMPLETE: 'INCOMPLETE',
  PAST_DUE: 'PAST_DUE',
  UNPAID: 'UNPAID',
} as const;

export const PRICE_TYPE = {
  ONE_TIME: 'ONE_TIME',
  SUBSCRIPTION: 'SUBSCRIPTION',
  POINTS_PACKAGE: 'POINTS_PACKAGE',
} as const;

// Type exports for TypeScript
export type TransactionType = keyof typeof TRANSACTION_TYPE;
export type PointType = keyof typeof POINT_TYPE;
export type UserStatus = keyof typeof USER_STATUS;
export type OrderStatus = keyof typeof ORDER_STATUS;
export type SubscriptionStatus = keyof typeof SUBSCRIPTION_STATUS;
export type PriceType = keyof typeof PRICE_TYPE;