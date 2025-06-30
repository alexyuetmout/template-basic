'use client'

import React from 'react'
import { I18nextProvider } from 'react-i18next'
import initTranslations from '@/app/i18n'
import { createInstance } from 'i18next'

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: {
  children: React.ReactNode
  locale: string
  namespaces: string[]
  resources: any
}) {
  const [i18n, setI18n] = React.useState<any>(null)

  React.useEffect(() => {
    const loadTranslations = async () => {
      const i18nInstance = createInstance()
      const { i18n: initializedI18n } = await initTranslations(
        locale,
        namespaces,
        i18nInstance,
        resources
      )
      setI18n(initializedI18n)
    }
    loadTranslations()
  }, [locale, namespaces, resources])

  if (!i18n) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}