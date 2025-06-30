'use client'

import { useTranslation } from '@/hooks/useTranslation'
import i18nConfig from '../../../i18nConfig'

export function usePath() {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language // 从i18n实例获取当前语言
  
  return (path: string | undefined) => {
    // 处理空值
    if (!path) {
      console.warn('usePath received undefined path')
      return '/'
    }
    
    // 处理特殊链接，直接返回
    if (path.startsWith('http') || 
        path.startsWith('#') || 
        path.startsWith('mailto:') || 
        path.startsWith('tel:')) {
      return path
    }
    
    // 默认语言不添加前缀
    if (currentLocale === i18nConfig.defaultLocale) {
      return path
    }
    
    // 其他语言添加前缀
    return `/${currentLocale}${path}`
  }
}