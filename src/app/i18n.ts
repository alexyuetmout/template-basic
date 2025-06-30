import { createInstance, Resource } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18nConfig from '../../i18nConfig'

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: any,
  resources?: Resource
) {
  i18nInstance = i18nInstance || createInstance()

  i18nInstance.use(initReactI18next)

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../translations/${language}/${namespace}.json`)
      )
    )
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    ns: namespaces,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['path', 'cookie'],
      caches: ['cookie']
    }
  })

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  }
}