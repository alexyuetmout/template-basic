'use client'

import { useTranslation as useTranslationOrg } from 'react-i18next'
import type { Namespace } from '@/lib/i18n-config'

export const useTranslation = (namespace?: Namespace) => {
  return useTranslationOrg(namespace || 'common')
}