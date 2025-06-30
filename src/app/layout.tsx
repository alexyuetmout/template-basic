import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import i18nConfig from '../../i18nConfig'

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Template Basic",
  description: "Modern web application template",
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}