import { AdminShell } from "../../../../components/admin-shell";

export default function AdminVouchersPage() {
  return (
    <AdminShell>
      <h1 className="text-3xl font-semibold">Ưu đãi</h1>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {["FRESH20", "GREEN10"].map((code) => (
          <article key={code} className="rounded-lg border border-line bg-background p-4">
            <h2 className="font-semibold">{code}</h2>
            <p className="mt-2 text-sm text-muted">Áp dụng từ subtotal 200.000đ, không tính phí giao hàng.</p>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
