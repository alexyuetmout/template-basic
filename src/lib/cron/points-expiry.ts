import { UserService } from "@/lib/services/user";
import { PointsService } from "@/lib/services/points";
import { SubscriptionService } from "@/lib/services/subscriptions";

/**
 * Cron job to handle expired points
 * Should be run daily
 */
export async function handleExpiredPoints() {
  console.log("Starting expired points cleanup...");
  
  try {
    const usersWithExpiredPoints = await UserService.getUsersWithExpiredPoints();
    
    for (const user of usersWithExpiredPoints) {
      console.log(`Expiring points for user: ${user.email}`);
      
      // Create expiry transaction
      await PointsService.expireUserPoints(user.id);
      
      // Update user record
      await UserService.expireUserPoints(user.id);
    }
    
    console.log(`Expired points for ${usersWithExpiredPoints.length} users`);
  } catch (error) {
    console.error("Error handling expired points:", error);
    throw error;
  }
}

/**
 * Cron job to handle yearly subscription points distribution
 * Should be run daily
 */
export async function handleYearlySubscriptionPoints() {
  console.log("Starting yearly subscription points distribution...");
  
  try {
    await SubscriptionService.processYearlySubscriptionPoints();
    console.log("Yearly subscription points distribution completed");
  } catch (error) {
    console.error("Error handling yearly subscription points:", error);
    throw error;
  }
}

/**
 * Combined cron job for all point-related tasks
 */
export async function runPointsCronJobs() {
  console.log("Running points cron jobs...");
  
  await handleExpiredPoints();
  await handleYearlySubscriptionPoints();
  
  console.log("Points cron jobs completed");
}