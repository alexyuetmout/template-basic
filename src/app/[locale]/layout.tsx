import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import i18nConfig from "../../../i18nConfig";

const i18nNamespaces = ["common", "home"];

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
