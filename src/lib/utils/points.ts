export function calculatePointsExpiry(months: number = 12): Date {
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + months);
  return expiryDate;
}

export function formatPoints(points: number): string {
  return new Intl.NumberFormat("en-US").format(points);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100); // Convert from cents to dollars
}

export function isSubscriptionActive(subscription: { status: string; currentPeriodEnd: string | Date } | null): boolean {
  if (!subscription) return false;
  
  const now = new Date();
  const endDate = new Date(subscription.currentPeriodEnd);
  
  return subscription.status === "ACTIVE" && endDate > now;
}

export function getNextBillingDate(subscriptionType: string, startDate: Date): Date {
  const nextDate = new Date(startDate);
  
  switch (subscriptionType) {
    case "MONTHLY":
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case "YEARLY":
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
    case "WEEKLY":
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    default:
      // Default to monthly
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
  }
  
  return nextDate;
}