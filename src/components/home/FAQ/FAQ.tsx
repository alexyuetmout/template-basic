"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/useTranslation";
import { HeadingH2 } from "@/components/ui/headings";

export function FAQ() {
  const { t } = useTranslation("home");

  const faqs = t("faq.items", { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-md mb-6 dark:bg-primary/20/20 dark:text-primary">
            {t("faq.badge")}
          </div>
          <HeadingH2 className="text-foreground dark:text-white mb-4">
            {t("faq.title")}
          </HeadingH2>
          <p className="text-lg text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ Items */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-0 bg-background dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 px-6 py-4"
            >
              <AccordionTrigger className="text-left hover:no-underline py-0 text-lg font-semibold text-foreground dark:text-white [&>svg:last-child]:hidden [&[data-state=open]>.plus-icon]:hidden [&[data-state=open]>.chevron-icon]:block">
                <span className="flex-1">{faq.question}</span>
                <svg 
                  className="plus-icon w-5 h-5 text-primary dark:text-primary flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <svg 
                  className="chevron-icon w-5 h-5 text-primary dark:text-primary flex-shrink-0 hidden" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-0">
                <p className="text-muted-foreground dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground dark:text-muted-foreground mb-6">
            {t("faq.contactText")}
          </p>
          <a
            href="mailto:support@aimaker.com"
            className="inline-block px-8 py-3 bg-primary hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            {t("faq.contactButton")}
          </a>
        </div>
      </div>
    </section>
  );
}