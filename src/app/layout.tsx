import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Template Basic",
  description: "A modern Next.js template with internationalization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
