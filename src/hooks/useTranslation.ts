'use client'

import { useTranslation as useTranslationOrg } from 'react-i18next'

export const useTranslation = (namespace?: string) => {
  return useTranslationOrg(namespace || 'common')
}