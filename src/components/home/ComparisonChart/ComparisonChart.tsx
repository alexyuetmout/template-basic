import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export function ComparisonChart() {
  const traditionalTasks = [
    "2-3 weeks to set up Authentication System",
    "2-3 weeks to set up Payment Integration", 
    "2-3 weeks to set up AI Infrastructure",
    "2-3 weeks to set up Component Library",
    "2-3 weeks to set up Dark Mode Support",
    "2-3 weeks to set up SEO Optimization",
    "2-3 weeks to set up TypeScript Setup",
    "2-3 weeks to set up Development Tools"
  ]

  const aimakerFeatures = [
    "Ready to use Authentication System",
    "Ready to use Payment Integration",
    "Ready to use AI Infrastructure", 
    "Ready to use Component Library",
    "Ready to use Dark Mode Support",
    "Ready to use SEO Optimization",
    "Ready to use TypeScript Setup",
    "Ready to use Development Tools"
  ]

  const savings = [
    {
      title: "Development Time",
      description: "Save 3-4 months of development time"
    },
    {
      title: "Development Cost", 
      description: "Save $20,000+ in development costs"
    },
    {
      title: "Maintenance",
      description: "Reduce ongoing maintenance costs"
    },
    {
      title: "Time to Market",
      description: "Launch your product faster"
    }
  ]

  return (
    <div className="relative py-20 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
            Why Choose AIMaker Template?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600 dark:text-neutral-400">
            Save weeks of development time and focus on what matters most
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Traditional Development */}
          <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800 rounded-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Traditional Development
              </h3>
              <ul className="space-y-4 mb-8">
                {traditionalTasks.map((task, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {task}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                  3-4 Months
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Total Development Time
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AIMaker Template */}
          <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800 rounded-2xl relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Recommended
              </span>
            </div>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                AIMaker Template
              </h3>
              <ul className="space-y-4 mb-8">
                {aimakerFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  5 Minutes
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  Setup Time
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Savings */}
          <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 rounded-2xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Your Savings
              </h3>
              <div className="space-y-6">
                {savings.map((saving, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      {saving.title}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {saving.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}