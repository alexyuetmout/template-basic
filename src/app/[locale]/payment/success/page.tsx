import { Suspense } from "react";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function PaymentSuccessContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            支付成功！
          </CardTitle>
          <CardDescription className="text-green-600">
            您的购买已成功完成
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center text-gray-600">
            <p>感谢您的购买！我们已经收到您的付款，相关服务将很快激活。</p>
            <p className="mt-2 text-sm">
              您将收到一封确认邮件，其中包含您的购买详情。
            </p>
          </div>
          
          <div className="flex flex-col gap-3 pt-4">
            <Button asChild className="w-full">
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/orders">
                View Order History
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}