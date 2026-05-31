import { AdminShell } from "../../../../components/admin-shell";

export default function AdminReportsPage() {
  return (
    <AdminShell>
      <h1 className="text-3xl font-semibold">Báo cáo</h1>
      <div className="mt-5 rounded-lg border border-line bg-background p-4">
        <p className="text-sm text-muted">Báo cáo doanh thu, món bán chạy và khách hàng sẽ dùng dữ liệu API khi bật database.</p>
      </div>
    </AdminShell>
  );
}
