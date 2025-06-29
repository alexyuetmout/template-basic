import { PrismaClient } from '@prisma/client';
import { SettingsService } from '../src/lib/services/settings';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Initialize default app settings
  await SettingsService.initializeDefaultSettings();
  console.log('✅ Default settings created');

  // Create sample prices
  const prices = [
    {
      id: 'price_basic',
      stripePriceId: 'price_1234567890_basic',
      amount: 999, // $9.99
      type: 'ONE_TIME' as const,
      pointsReward: 100,
      sortOrder: 1,
      isActive: true,
    },
    {
      id: 'price_pro',
      stripePriceId: 'price_1234567890_pro',
      amount: 2999, // $29.99
      type: 'ONE_TIME' as const,
      pointsReward: 350,
      sortOrder: 2,
      isActive: true,
    },
    {
      id: 'price_monthly',
      stripePriceId: 'price_1234567890_monthly',
      amount: 1999, // $19.99
      type: 'SUBSCRIPTION' as const,
      interval: 'MONTH' as const,
      pointsReward: 200,
      sortOrder: 3,
      isActive: true,
    },
    {
      id: 'price_yearly',
      stripePriceId: 'price_1234567890_yearly',
      amount: 19999, // $199.99
      type: 'SUBSCRIPTION' as const,
      interval: 'YEAR' as const,
      pointsReward: 2400, // 200 points per month
      sortOrder: 4,
      isActive: true,
    },
    {
      id: 'price_points_1000',
      stripePriceId: 'price_1234567890_points_1000',
      amount: 4999, // $49.99
      type: 'POINTS_PACKAGE' as const,
      pointsReward: 1000,
      sortOrder: 5,
      isActive: true,
    },
  ];

  for (const price of prices) {
    await prisma.price.upsert({
      where: { id: price.id },
      update: price,
      create: price,
    });
  }
  console.log('✅ Sample prices created');

  // Create a test admin user (optional)
  if (process.env.CREATE_ADMIN_USER === 'true') {
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
        isAdmin: true,
        status: 'ACTIVE',
        emailVerified: true,
      },
    });
    console.log('✅ Admin user created:', adminUser.email);
  }

  console.log('Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });