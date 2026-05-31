import { BellRing, CalendarDays, CircleDollarSign, Soup } from "lucide-react";
import { AdminShell } from "../../../../components/admin-shell";
import { StatCard } from "../../../../components/stat-card";
import { demoBookings, demoOrders } from "../../../../lib/demo-data";
import { formatVnd } from "@an-nhien/shared";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Staff dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold">Điều phối hôm nay</h1>
        </div>
        <button className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-white" type="button">
          <BellRing size={16} aria-hidden="true" />
          Test âm báo
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Doanh thu" value={formatVnd(0)} icon={CircleDollarSign} />
        <StatCard label="Đơn chờ" value={String(demoOrders.length)} icon={BellRing} tone="wood" />
        <StatCard label="Đang bếp" value="0" icon={Soup} tone="accent" />
        <StatCard label="Đặt bàn" value={String(demoBookings.length)} icon={CalendarDays} />
      </div>
      <section className="mt-6 rounded-lg border border-line">
        <div className="border-b border-line bg-background px-4 py-3 font-semibold">Đơn mới</div>
        <div className="divide-y divide-line">
          {demoOrders.map((order) => (
            <article key={order.id} className="grid gap-3 p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
              <div>
                <h2 className="font-semibold">{order.customerName}</h2>
                <p className="text-sm text-muted">{order.address}</p>
              </div>
              <span className="text-sm font-semibold text-primary">{formatVnd(order.total)}</span>
              <button className="h-10 rounded-md bg-primary px-3 text-sm font-semibold text-white" type="button">
                Xác nhận đơn
              </button>
            </article>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
