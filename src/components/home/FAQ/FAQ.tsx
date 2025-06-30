"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/useTranslation";

export function FAQ() {
  const { t } = useTranslation("home");

  const faqs = t("faq.items", { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  // 防止空数据导致的错误
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-neutral-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-muted-foreground">{t("faq.subtitle")}</p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 px-6 data-[state=open]:shadow-md transition-all"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6 text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
