import { Suspense } from "react";
import { Check, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePath } from "@/hooks/usePath";
import { useTranslation } from "@/hooks/useTranslation";

function SubscriptionSuccessContent() {
  const { routes } = usePath();
  const { t } = useTranslation('payment');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-chart-2" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            {t('subscription.success.title')}
          </CardTitle>
          <CardDescription className="text-chart-2">
            {t('subscription.success.description')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center text-muted-foreground">
            <p>{t('subscription.success.message')}</p>
            <div className="mt-4 p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{t('subscription.success.activated')}</span>
              </div>
              <p className="text-xs text-primary mt-1">
                {t('subscription.success.billingReminder')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 pt-4">
            <Button asChild className="w-full">
              <Link href={routes.DASHBOARD}>
                {t('subscription.success.goToDashboard')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href={routes.DASHBOARD_SUBSCRIPTIONS}>
                {t('subscription.success.manageSubscriptions')}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <SubscriptionSuccessContent />
    </Suspense>
  );
}