"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Leaf,
  LayoutDashboard,
  MapPinned,
  Menu,
  ShieldCheck,
  ShoppingBag,
  User,
  X
} from "lucide-react";
import { BackgroundFx } from "./background-fx";
import { SiteFooter } from "./site-footer";

const nav = [
  { href: "/", label: "Đặt món", icon: ShoppingBag },
  { href: "/menu", label: "Menu", icon: Leaf },
  { href: "/booking", label: "Đặt bàn", icon: CalendarDays },
  { href: "/contact", label: "Liên hệ", icon: MapPinned },
  { href: "/policies", label: "Chính sách", icon: ShieldCheck },
  { href: "/admin/dashboard", label: "Nhân viên", icon: LayoutDashboard }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="site-canvas min-h-screen">
      <BackgroundFx />
      <header className="sticky top-0 z-30 border-b border-white/55 bg-white/58 shadow-[0_10px_32px_rgba(47,49,45,0.06)] backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-[0_10px_24px_rgba(47,107,79,0.28)]">
              <Leaf size={22} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-base font-semibold leading-tight">An Nhiên</span>
              <span className="block truncate text-xs text-muted">Nhà hàng chay</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-charcoal transition hover:bg-white/70 hover:text-primary"
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/login"
              className="ml-2 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-white transition hover:bg-charcoal"
            >
              <User size={16} aria-hidden="true" />
              Đăng nhập
            </Link>
          </div>

          {/* Mobile nav toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-md text-charcoal transition hover:bg-white/70"
            >
              <ShoppingBag size={20} />
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                3
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-md text-charcoal transition hover:bg-white/70"
              aria-label="Mở menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-[280px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
                  <Leaf size={16} />
                </span>
                <span className="font-semibold">An Nhiên</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted hover:bg-background"
                aria-label="Đóng menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {nav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-charcoal transition hover:bg-mint hover:text-primary"
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-line p-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-white transition hover:bg-charcoal"
              >
                <User size={16} />
                Đăng nhập
              </Link>
            </div>
          </aside>
        </div>
      )}

      <main className="relative z-10">{children}</main>
      <div className="relative z-10">
        <SiteFooter />
      </div>
    </div>
  );
}
