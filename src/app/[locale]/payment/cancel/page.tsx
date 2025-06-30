import { X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-800">
            支付取消
          </CardTitle>
          <CardDescription className="text-red-600">
            您的支付已被取消
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center text-gray-600">
            <p>没关系，您可以随时重新开始购买流程。</p>
            <p className="mt-2 text-sm">
              如果您遇到任何问题，请随时联系我们的客服团队。
            </p>
          </div>
          
          <div className="flex flex-col gap-3 pt-4">
            <Button asChild className="w-full">
              <Link href="/pricing">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回定价页面
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                返回首页
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}