"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, Package, Printer, Truck, CheckCircle2, XCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { AppShell } from "../../../components/app-shell";
import { formatVnd } from "@an-nhien/shared";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Chờ xác nhận", color: "text-wood", bg: "bg-wood/10" },
  confirmed: { label: "Đã xác nhận", color: "text-primary", bg: "bg-mint" },
  preparing: { label: "Đang chuẩn bị", color: "text-accent", bg: "bg-accent/10" },
  shipping: { label: "Đang giao", color: "text-primary", bg: "bg-primary/10" },
  delivered: { label: "Đã giao", color: "text-primary", bg: "bg-mint" },
  cancelled: { label: "Đã huỷ", color: "text-danger", bg: "bg-danger/10" }
};

const statusTimeline = ["pending", "confirmed", "preparing", "shipping", "delivered"];

const demoOrders = [
  {
    id: "AN-240601-001",
    status: "preparing",
    createdAt: new Date(Date.now() - 3 * 60000).toISOString(),
    items: [
      { name: "Cơm sen An Nhiên", quantity: 2, unitPrice: 89000 },
      { name: "Trà thảo mộc ấm", quantity: 1, unitPrice: 39000 }
    ],
    subtotal: 217000,
    shippingFee: 34000,
    discount: 20000,
    total: 231000,
    address: "Quận 1, TP.HCM",
    paymentMethod: "COD",
    canCancel: false
  },
  {
    id: "AN-240531-012",
    status: "delivered",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: [
      { name: "Bún nấm thanh vị", quantity: 1, unitPrice: 79000 },
      { name: "Gỏi cuốn ngũ sắc", quantity: 2, unitPrice: 69000 }
    ],
    subtotal: 217000,
    shippingFee: 0,
    discount: 0,
    total: 217000,
    address: "Quận 3, TP.HCM",
    paymentMethod: "MoMo",
    canCancel: false
  },
  {
    id: "AN-240530-008",
    status: "cancelled",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    items: [
      { name: "Lẩu nấm chay", quantity: 1, unitPrice: 189000 }
    ],
    subtotal: 189000,
    shippingFee: 34000,
    discount: 0,
    total: 223000,
    address: "Quận 7, TP.HCM",
    paymentMethod: "VNPay",
    canCancel: false
  }
];

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(demoOrders[0].id);

  return (
    <AppShell>
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Đơn hàng của bạn</h1>
            <p className="mt-1 text-sm text-muted">{demoOrders.length} đơn hàng</p>
          </div>
          <Link
            href="/menu"
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white transition hover:bg-charcoal"
          >
            <ShoppingBag size={16} /> Đặt thêm
          </Link>
        </div>

        <div className="mt-6 grid gap-4">
          {demoOrders.map((order, index) => {
            const isExpanded = expandedOrder === order.id;
            const status = statusConfig[order.status] ?? statusConfig.pending;
            const currentStep = statusTimeline.indexOf(order.status);

            return (
              <article
                key={order.id}
                className="reveal overflow-hidden rounded-lg border border-line bg-white transition hover:shadow-soft"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Header */}
                <button
                  type="button"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mint text-primary">
                      <Package size={20} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold">{order.id}</h2>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.color} ${status.bg}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-muted">
                        {order.items.length} món • {order.paymentMethod} • {new Date(order.createdAt).toLocaleDateString("vi")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-primary">{formatVnd(order.total)}</span>
                    {isExpanded ? <ChevronUp size={18} className="text-muted" /> : <ChevronDown size={18} className="text-muted" />}
                  </div>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-line px-5 pb-5 pt-4">
                    {/* Status timeline */}
                    {order.status !== "cancelled" && (
                      <div className="mb-5">
                        <div className="flex items-center justify-between">
                          {statusTimeline.map((step, i) => {
                            const stepStatus = statusConfig[step];
                            const isActive = i <= currentStep;
                            const isCurrent = i === currentStep;
                            return (
                              <div key={step} className="flex flex-1 items-center">
                                <div className="flex flex-col items-center gap-1">
                                  <span
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                                      isCurrent
                                        ? "bg-primary text-white shadow-[0_4px_14px_rgba(47,107,79,0.3)]"
                                        : isActive
                                          ? "bg-primary/20 text-primary"
                                          : "bg-background text-muted"
                                    }`}
                                  >
                                    {isActive ? <CheckCircle2 size={14} /> : i + 1}
                                  </span>
                                  <span className={`text-[10px] font-medium ${isCurrent ? "text-primary" : "text-muted"}`}>
                                    {stepStatus.label}
                                  </span>
                                </div>
                                {i < statusTimeline.length - 1 && (
                                  <div className={`mx-1 h-0.5 flex-1 rounded ${isActive && i < currentStep ? "bg-primary" : "bg-line"}`} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {order.status === "cancelled" && (
                      <div className="mb-5 flex items-center gap-3 rounded-lg bg-danger/5 p-4">
                        <XCircle className="shrink-0 text-danger" size={20} />
                        <div>
                          <p className="text-sm font-semibold text-danger">Đơn hàng đã bị huỷ</p>
                          <p className="mt-0.5 text-xs text-muted">Liên hệ hotline nếu cần hỗ trợ.</p>
                        </div>
                      </div>
                    )}

                    {/* Order items */}
                    <div className="rounded-lg bg-background p-4">
                      <p className="mb-3 text-xs font-semibold uppercase text-muted">Chi tiết đơn</p>
                      <div className="grid gap-2">
                        {order.items.map((item) => (
                          <div key={item.name} className="flex items-center justify-between text-sm">
                            <span>
                              {item.name} <span className="text-muted">× {item.quantity}</span>
                            </span>
                            <span className="font-medium">{formatVnd(item.unitPrice * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 grid gap-1 border-t border-line pt-3 text-sm">
                        <div className="flex justify-between text-muted">
                          <span>Tạm tính</span>
                          <span>{formatVnd(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-muted">
                          <span>Phí giao</span>
                          <span>{order.shippingFee === 0 ? "Miễn phí" : formatVnd(order.shippingFee)}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-primary">
                            <span>Giảm giá</span>
                            <span>-{formatVnd(order.discount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-line pt-2 font-semibold">
                          <span>Tổng cộng</span>
                          <span className="text-primary">{formatVnd(order.total)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Address + actions */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <Truck size={14} />
                        {order.address}
                      </div>
                      {order.canCancel && (
                        <button
                          type="button"
                          className="inline-flex h-9 items-center gap-1.5 rounded-md border border-danger px-3 text-xs font-semibold text-danger transition hover:bg-danger/5"
                        >
                          <XCircle size={14} /> Huỷ đơn
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
