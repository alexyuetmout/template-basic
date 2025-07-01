// 集中管理i18n配置
export const i18nConfig = {
  locales: ['en', 'zh', 'ja'] as const,
  defaultLocale: 'en' as const,
  namespaces: ['common', 'auth', 'home', 'dashboard', 'pricing', 'payment'] as const,
  prefixDefault: false
} as const

export type Locale = typeof i18nConfig.locales[number]
export type Namespace = typeof i18nConfig.namespaces[number]

// 语言显示名称映射
export const localeNames = {
  en: 'English',
  zh: '中文',
  ja: '日本語'
} as const

// 检查是否为有效的语言代码
export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale)
}

// 检查是否为有效的命名空间
export function isValidNamespace(namespace: string): namespace is Namespace {
  return i18nConfig.namespaces.includes(namespace as Namespace)
}