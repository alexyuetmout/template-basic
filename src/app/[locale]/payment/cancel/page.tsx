import { X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePath } from "@/hooks/usePath";
import { useTranslation } from "@/hooks/useTranslation";

export default function PaymentCancelPage() {
  const { routes } = usePath();
  const { t } = useTranslation('payment');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <X className="w-8 h-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-800">
            {t('cancel.title')}
          </CardTitle>
          <CardDescription className="text-destructive">
            {t('cancel.description')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center text-muted-foreground">
            <p>{t('cancel.message')}</p>
            <p className="mt-2 text-sm">
              {t('cancel.support')}
            </p>
          </div>
          
          <div className="flex flex-col gap-3 pt-4">
            <Button asChild className="w-full">
              <Link href={routes.PRICING}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('cancel.backToPricing')}
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href={routes.HOME}>
                {t('cancel.backToHome')}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}