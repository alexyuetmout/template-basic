import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import i18nConfig from "../../../i18nConfig";
import { i18nConfig as appI18nConfig } from "@/lib/i18n-config";

const i18nNamespaces = [...appI18nConfig.namespaces];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        {children}
      </TranslationsProvider>
    </>
  );
}
