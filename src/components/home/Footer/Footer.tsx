"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { usePath } from "@/hooks/usePath";

export function Footer() {
  const { t } = useTranslation("home");
  const { routes } = usePath();

  return (
    <footer className="bg-background dark:bg-background border-t border-border dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-16">
            {/* Logo and description */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.svg" alt="AIMaker" width={32} height={32} />
                <span className="text-xl font-bold text-foreground dark:text-foreground">
                  AIMaker
                </span>
              </div>
              <p className="text-muted-foreground dark:text-muted-foreground mb-6">
                {t("footer.description")}
              </p>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/aimaker-dev"
                  className="text-muted-foreground hover:text-muted-foreground dark:hover:text-muted transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Link>
                <Link
                  href="https://twitter.com/aimaker_dev"
                  className="text-muted-foreground hover:text-muted-foreground dark:hover:text-muted transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-sm font-semibold text-foreground dark:text-foreground uppercase tracking-wider mb-4">
                {t("footer.sections.product.title")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={routes.HOME}
                    className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors"
                  >
                    {t("footer.sections.product.items.home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={routes.PRICING}
                    className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors"
                  >
                    {t("footer.sections.product.items.pricing")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={routes.BLOG}
                    className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors"
                  >
                    {t("footer.sections.product.items.blog")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-foreground dark:text-foreground uppercase tracking-wider mb-4">
                {t("footer.sections.resources.title")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="https://github.com/aimaker-dev/aimaker-template"
                    className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors"
                  >
                    {t("footer.sections.resources.items.documentation")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/aimaker-dev/aimaker-template/discussions"
                    className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors"
                  >
                    {t("footer.sections.resources.items.community")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/aimaker-dev/aimaker-template/issues"
                    className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors"
                  >
                    {t("footer.sections.resources.items.support")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-foreground dark:text-foreground uppercase tracking-wider mb-4">
                {t("footer.sections.legal.title")}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={routes.PRIVACY}
                    className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors"
                  >
                    {t("footer.sections.legal.items.privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={routes.TERMS}
                    className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors"
                  >
                    {t("footer.sections.legal.items.terms")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={routes.COOKIES}
                    className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground transition-colors"
                  >
                    {t("footer.sections.legal.items.cookies")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-border dark:border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground dark:text-muted-foreground text-sm">
              {t("footer.copyright")}
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-muted-foreground dark:text-muted-foreground text-sm">
                {t("footer.madeWith")}
              </span>
              <Link
                href="https://nextjs.org"
                className="text-muted-foreground hover:text-muted-foreground dark:hover:text-muted transition-colors"
              >
                <Image
                  src="/images/logos/nextjs.svg"
                  alt="Next.js"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="https://tailwindcss.com"
                className="text-muted-foreground hover:text-muted-foreground dark:hover:text-muted transition-colors"
              >
                <Image
                  src="/images/logos/tailwind.svg"
                  alt="Tailwind CSS"
                  width={20}
                  height={20}
                />
              </Link>
              <Link
                href="https://vercel.com"
                className="text-muted-foreground hover:text-muted-foreground dark:hover:text-muted transition-colors"
              >
                <Image
                  src="/images/logos/vercel.svg"
                  alt="Vercel"
                  width={20}
                  height={20}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
