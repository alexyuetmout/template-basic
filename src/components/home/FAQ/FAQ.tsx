import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="flex-1">
            <div className="sticky top-24">
              <div className="inline-block bg-[#7CE1FF] dark:bg-blue-500/20 bg-opacity-20 px-4 py-1.5 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                FAQ
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
                Frequently<br/>asked<br/>questions
              </h2>
              <p className="mt-6 text-muted-foreground text-lg">
                For any unanswered questions, reach out to our support team via email. We&rsquo;ll respond as soon as possible to assist you.
              </p>
            </div>
          </div>

          <div className="flex-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-border/40 dark:border-border/20">
                <AccordionTrigger className="text-left py-6 text-lg font-medium text-foreground hover:no-underline">
                  What is AIMaker Template?
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  AIMaker Template is a comprehensive Next.js 15 development framework designed for building AI-powered applications quickly. It includes pre-built authentication, payment processing, modern UI components, and AI integration capabilities.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-border/40 dark:border-border/20">
                <AccordionTrigger className="text-left py-6 text-lg font-medium text-foreground hover:no-underline">
                  What components are included?
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  The template includes 30+ modern UI components built with shadcn/ui, authentication components with GitHub/Google OAuth support, payment integration with Stripe, AI chat interfaces, dashboard layouts, forms, modals, and navigation components.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-border/40 dark:border-border/20">
                <AccordionTrigger className="text-left py-6 text-lg font-medium text-foreground hover:no-underline">
                  What technologies does it use?
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  Built with Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui components, Better Auth for authentication, Stripe for payments, Resend for emails, and optimized for deployment on Vercel, Zeabur, or Cloudflare.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-border/40 dark:border-border/20">
                <AccordionTrigger className="text-left py-6 text-lg font-medium text-foreground hover:no-underline">
                  How customizable is the template?
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  Extremely customizable! The template uses CSS variables for theming, modular component architecture, and follows modern React patterns. You can easily customize colors, fonts, layouts, add your own components, and extend the AI integration.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b-0">
                <AccordionTrigger className="text-left py-6 text-lg font-medium text-foreground hover:no-underline">
                  How do I get started?
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-muted-foreground">
                  Getting started is simple: 1) Purchase and download the template, 2) Clone the repository and install dependencies, 3) Set up your environment variables, 4) Customize the design and components, and 5) Deploy to your preferred hosting platform.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
} 