"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/auth/UserDropdown";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { useTranslation } from "@/hooks/useTranslation";
import { usePath } from "@/lib/utils/path";

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface AuthButton {
  label: string;
  href: string;
  variant: "ghost" | "default";
  className: string;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation("home");
  const path = usePath();

  const navigationItems: NavItem[] = [
    { label: t("header.navigation.home"), href: "/" },
    { label: t("header.navigation.features"), href: "/#features" },
    { label: t("header.navigation.pricing"), href: "/pricing" },
    { label: t("header.navigation.blog"), href: "/blog" },
  ];

  const authButtons: AuthButton[] = [
    {
      label: t("header.auth.login"),
      href: "/auth/sign-in",
      variant: "ghost",
      className:
        "h-9 rounded-lg px-3 hover:bg-neutral-200/50 hover:text-accent-foreground transition-all duration-200",
    },
    {
      label: t("header.auth.signup"),
      href: "/auth/sign-up",
      variant: "default",
      className:
        "h-9 rounded-lg px-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xs transition-all duration-200",
    },
  ];

  const Logo = () => (
    <Link className="flex items-center gap-2" href={path("/")}>
      <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">AI</span>
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        AIMaker
      </span>
    </Link>
  );

  const pathname = usePathname();

  const NavLink = ({
    item,
    isActive,
  }: {
    item: NavItem;
    isActive: boolean;
  }) => (
    <li className="h-full">
      <Link
        className={`h-full px-4 flex items-center text-sm transition-colors hover:text-foreground hover:bg-muted rounded-xl ${
          isActive
            ? "text-foreground font-semibold"
            : "text-muted-foreground font-medium"
        }`}
        href={path(item.href)}
      >
        {item.label}
      </Link>
    </li>
  );

  const Navigation = () => {
    return (
      <nav className="hidden md:flex">
        <ul className="flex items-center h-10">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href === "/" && pathname === "/");
            return <NavLink key={item.href} item={item} isActive={isActive} />;
          })}
        </ul>
      </nav>
    );
  };

  const AuthButtons = () => {
    const { data: session } = useSession();

    if (session) {
      return (
        <div className="hidden md:flex items-center gap-3">
          <Link href={path("/dashboard")}>
            <Button
              variant="ghost"
              className="h-9 rounded-lg px-3 hover:bg-neutral-200/50"
            >
              Dashboard
            </Button>
          </Link>
          <UserDropdown
            user={{
              ...session.user,
              createdAt: session.user.createdAt
                ? session.user.createdAt.toISOString()
                : undefined,
            }}
          />
        </div>
      );
    }

    // 直接显示登录/注册按钮，不等待 session 验证
    return (
      <div className="hidden md:block">
        <div className="flex items-center gap-2">
          {authButtons.map((button) => (
            <Link key={button.href} href={path(button.href)}>
              <Button variant={button.variant} className={button.className}>
                {button.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo />
            <Navigation />
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}
