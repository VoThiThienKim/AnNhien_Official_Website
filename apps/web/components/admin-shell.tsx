import Link from "next/link";
import { ClipboardList, LayoutDashboard, Tags, Users, Utensils, BarChart3 } from "lucide-react";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Đơn hàng", icon: ClipboardList },
  { href: "/admin/menu", label: "Menu", icon: Utensils },
  { href: "/admin/vouchers", label: "Ưu đãi", icon: Tags },
  { href: "/admin/customers", label: "Khách hàng", icon: Users },
  { href: "/admin/reports", label: "Báo cáo", icon: BarChart3 }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-charcoal">
      <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-line bg-background px-4 py-5">
          <Link href="/" className="mb-6 block text-lg font-semibold text-primary">
            An Nhiên Ops
          </Link>
          <nav className="grid gap-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium hover:bg-mint">
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 bg-white p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

