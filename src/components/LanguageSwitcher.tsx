"use client";

import { useRouter, usePathname } from "next/navigation";
import i18nConfig from "../../i18nConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const languages = {
  en: "English",
  zh: "简体中文",
  "zh-TW": "繁體中文",
  ko: "한국어",
  ja: "日本語",
  pt: "Português",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  vi: "Tiếng Việt",
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const getCurrentLocale = () => {
    const segments = pathname.split("/");
    const firstSegment = segments[1];

    if (i18nConfig.locales.includes(firstSegment)) {
      return firstSegment;
    }
    return "en"; // Default to English
  };

  const currentLocale = getCurrentLocale();

  const handleChange = (newLocale: string) => {
    if (currentLocale === i18nConfig.defaultLocale) {
      router.push("/" + newLocale + pathname);
    } else {
      router.push(pathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 px-3 flex items-center gap-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          {/* Current Language */}
          <span className="text-sm font-medium text-neutral-700">
            {languages[currentLocale as keyof typeof languages] || "English"}
          </span>

          {/* Dropdown Arrow */}
          <ChevronDown className="h-4 w-4 text-neutral-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 p-1" sideOffset={8}>
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleChange(code)}
            className={`
              px-3 py-2 rounded-md cursor-pointer text-sm transition-colors
              ${
                currentLocale === code
                  ? "bg-purple-50 text-purple-700 font-medium"
                  : "text-neutral-700 hover:bg-neutral-50"
              }
            `}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
