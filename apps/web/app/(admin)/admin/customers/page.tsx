import { AdminShell } from "../../../../components/admin-shell";

export default function AdminCustomersPage() {
  return (
    <AdminShell>
      <h1 className="text-3xl font-semibold">Khách hàng</h1>
      <div className="mt-5 rounded-lg border border-line bg-background p-4">
        <p className="text-sm text-muted">Beta sẽ phân loại khách vãng lai, tiềm năng và thân thiết từ lịch sử đơn hàng.</p>
      </div>
    </AdminShell>
  );
}
