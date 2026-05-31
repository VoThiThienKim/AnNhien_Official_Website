import Link from "next/link";
import { ArrowRight, Lock, ReceiptText, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { AppShell } from "../../../components/app-shell";

const policies = [
  {
    href: "/policies/privacy",
    title: "Bảo mật thông tin",
    body: "Cách An Nhiên lưu, dùng và bảo vệ thông tin đặt món, đặt bàn.",
    icon: Lock
  },
  {
    href: "/policies/shipping",
    title: "Giao hàng",
    body: "Bán kính giao, cách tính phí, thời gian dự kiến và xử lý đơn trễ.",
    icon: Truck
  },
  {
    href: "/policies/refund",
    title: "Đổi trả & hoàn tiền",
    body: "Quy định khi món thiếu, lỗi, giao nhầm hoặc cần hoàn tiền.",
    icon: RotateCcw
  },
  {
    href: "/policies/terms",
    title: "Điều khoản sử dụng",
    body: "Điều kiện đặt món, đặt bàn, voucher và thanh toán trên website.",
    icon: ReceiptText
  }
];

export default function PoliciesPage() {
  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-primary">Chính sách</p>
          <h1 className="mt-2 text-4xl font-semibold">Thông tin minh bạch trước khi đặt món</h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Các chính sách beta được viết rõ để khách hàng biết cách giao hàng, thanh toán, đổi trả và bảo mật thông tin.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <Link key={policy.href} href={policy.href} className="group rounded-lg border border-line bg-white p-5 shadow-soft transition hover:-translate-y-1">
                <Icon className="text-primary" size={24} aria-hidden="true" />
                <h2 className="mt-4 text-xl font-semibold">{policy.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{policy.body}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Xem chi tiết
                  <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 rounded-lg bg-mint p-5">
          <ShieldCheck className="text-primary" size={24} aria-hidden="true" />
          <h2 className="mt-3 text-xl font-semibold">Cam kết beta</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Mọi đơn hàng beta đều cần xác nhận từ nhân viên trước khi bếp xử lý. Các thanh toán online chạy sandbox/mock cho đến khi kết nối provider thật.
          </p>
        </div>
      </section>
    </AppShell>
  );
}

