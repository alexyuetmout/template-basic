import { Header } from "@/components/home/Header/Header";
import { Footer } from "@/components/home/Footer/Footer";
import { PricingPlans } from "@/components/payments/PricingPlans";
import TagSchema from "@/components/TagSchema";
import { db } from "@/lib/db";

// 服务端获取价格数据
async function getPrices() {
  try {
    const prices = await db.price.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return prices;
  } catch (error) {
    console.error("Error fetching prices:", error);
    return [];
  }
}

export default async function PricingPage() {
  const prices = await getPrices();

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <TagSchema />
      <Header />
      <PricingPlans initialPrices={prices} />
      <Footer />
    </div>
  );
}
