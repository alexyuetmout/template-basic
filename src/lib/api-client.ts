'use client';

import { toast } from "sonner";
import { usePath } from "@/hooks/usePath";
import { useTranslation } from "@/hooks/useTranslation";

export function useApiClient() {
  const { routes } = usePath();
  const { t } = useTranslation('common');

  const handleResponse = async (response: Response) => {
    const data = await response.json();

    if (data.code === 0) {
      return data.data;
    }

    // 错误处理
    if (data.code === 401) {
      toast.error(t('error.unauthorized'));
      setTimeout(() => {
        window.location.href = routes.SIGN_IN;
      }, 500);
      throw new Error('Unauthorized');
    }

    if (data.code === 500) {
      toast.error(t('error.serviceError'));
      throw new Error(data.error || 'Service Error');
    }

    // 其他错误（400、404等）- 记录日志，显示具体错误信息
    console.warn('API parameter error:', { code: data.code, error: data.error });
    toast.error(data.error || 'Request failed');
    throw new Error(data.error || 'Request failed');
  };

  const apiPost = async (url: string, data: any) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  };

  const apiGet = async (url: string) => {
    const response = await fetch(url);
    return handleResponse(response);
  };

  return { apiPost, apiGet };
}