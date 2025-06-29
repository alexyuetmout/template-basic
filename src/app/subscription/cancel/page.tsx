import { X, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubscriptionCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-800">
            订阅取消
          </CardTitle>
          <CardDescription className="text-red-600">
            您的订阅流程已被取消
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center text-gray-600">
            <p>没关系，您可以随时重新订阅我们的服务。</p>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-center gap-2 text-orange-700">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">随时可以重新订阅</span>
              </div>
              <p className="text-xs text-orange-600 mt-1">
                我们提供灵活的订阅选项，满足您的不同需求
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 pt-4">
            <Button asChild className="w-full">
              <Link href="/pricing">
                <ArrowLeft className="w-4 h-4 mr-2" />
                查看订阅计划
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