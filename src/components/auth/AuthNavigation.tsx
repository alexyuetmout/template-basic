"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/useTranslation"
import { usePath } from "@/hooks/usePath"

export function AuthNavigation() {
  const { t } = useTranslation()
  const { routes } = usePath()
  
  return (
    <div className="absolute top-4 left-4 z-10">
      <div className="flex items-center gap-2">
        <Link href={routes.HOME}>
          <Button variant="ghost" size="sm" className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.backToHome')}
          </Button>
        </Link>
      </div>
    </div>
  )
}