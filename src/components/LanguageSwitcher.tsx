'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useCurrentLocale } from 'next-i18n-router/client'
import i18nConfig from '../../i18nConfig'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Globe } from 'lucide-react'

const languages = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語'
}

export default function LanguageSwitcher() {
  const router = useRouter()
  const currentLocale = useCurrentLocale(i18nConfig)
  const pathname = usePathname()

  const handleChange = (newLocale: string) => {
    if (currentLocale === i18nConfig.defaultLocale) {
      router.push('/' + newLocale + pathname)
    } else {
      router.push(pathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }
    
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleChange(code)}
            className={currentLocale === code ? 'bg-accent' : ''}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}