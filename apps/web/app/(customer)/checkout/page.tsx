"use client";

import { useState } from "react";
import { Banknote, CreditCard, MapPin, ShieldCheck, Smartphone, Tag, Truck, X } from "lucide-react";
import { AppShell } from "../../../components/app-shell";
import { formatVnd } from "@an-nhien/shared";

const paymentMethods = [
  { id: "cod", label: "Thanh toán khi nhận hàng", icon: Banknote, desc: "Trả tiền mặt cho shipper" },
  { id: "momo", label: "Ví MoMo", icon: Smartphone, desc: "Chuyển khoản qua ví MoMo" },
  { id: "vnpay", label: "VNPay", icon: CreditCard, desc: "Thanh toán qua cổng VNPay" }
];

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

  const subtotal = 257000;
  const shippingFee = 34000;
  const discount = appliedVoucher ? 20000 : 0;
  const total = subtotal + shippingFee - discount;

  return (
    <AppShell>
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-semibold">Thanh toán</h1>
        <p className="mt-1 text-sm text-muted">Kiểm tra thông tin và hoàn tất đơn hàng</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Left column */}
          <div className="space-y-5">
            {/* Shipping info */}
            <div className="rounded-lg border border-line bg-white p-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <MapPin size={20} className="text-primary" />
                Thông tin giao hàng
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm font-medium">
                  Họ tên
                  <input
                    className="h-11 rounded-md border border-line px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    defaultValue="Minh Anh"
                  />
                </label>
                <label className="grid gap-1.5 text-sm font-medium">
                  Số điện thoại
                  <input
                    className="h-11 rounded-md border border-line px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    defaultValue="0900000000"
                  />
                </label>
                <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
                  Địa chỉ giao hàng
                  <textarea
                    className="min-h-20 rounded-md border border-line px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    defaultValue="Quận 1, TP.HCM"
                  />
                </label>
                <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
                  Ghi chú đơn hàng
                  <input
                    className="h-11 rounded-md border border-line px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="VD: Giao giờ trưa, gọi trước khi giao..."
                  />
                </label>
              </div>
            </div>

            {/* Shipping estimate */}
            <div className="rounded-lg border border-line bg-white p-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Truck size={20} className="text-primary" />
                Phương thức giao hàng
              </h2>
              <div className="mt-4 grid gap-3">
                <label className="flex cursor-pointer items-center justify-between rounded-lg border-2 border-primary bg-mint/40 p-4 transition">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" defaultChecked className="accent-primary" />
                    <div>
                      <p className="text-sm font-semibold">Giao nhanh</p>
                      <p className="text-xs text-muted">Giao trong 30–45 phút</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">{formatVnd(34000)}</span>
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-lg border border-line p-4 transition hover:border-primary/50">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="shipping" className="accent-primary" />
                    <div>
                      <p className="text-sm font-semibold">Giao tiết kiệm</p>
                      <p className="text-xs text-muted">Giao trong 45–60 phút</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">{formatVnd(22000)}</span>
                </label>
              </div>
            </div>

            {/* Payment methods */}
            <div className="rounded-lg border border-line bg-white p-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <CreditCard size={20} className="text-primary" />
                Phương thức thanh toán
              </h2>
              <div className="mt-4 grid gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const isActive = selectedPayment === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedPayment(method.id)}
                      className={`flex items-center gap-4 rounded-lg border-2 p-4 text-left transition ${
                        isActive ? "border-primary bg-mint/40" : "border-line hover:border-primary/50"
                      }`}
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${isActive ? "bg-primary text-white" : "bg-background text-muted"}`}>
                        <Icon size={20} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{method.label}</p>
                        <p className="text-xs text-muted">{method.desc}</p>
                      </div>
                      <span className={`ml-auto h-5 w-5 shrink-0 rounded-full border-2 ${isActive ? "border-primary bg-primary" : "border-line"}`}>
                        {isActive && (
                          <svg viewBox="0 0 20 20" fill="white" className="h-full w-full">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column - Order summary */}
          <aside className="h-fit space-y-4 lg:sticky lg:top-20">
            {/* Voucher */}
            <div className="rounded-lg border border-line bg-white p-4">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <Tag size={16} className="text-primary" />
                Mã giảm giá
              </h2>
              {appliedVoucher ? (
                <div className="mt-3 flex items-center justify-between rounded-md bg-mint px-3 py-2">
                  <span className="text-sm font-semibold text-primary">{appliedVoucher}</span>
                  <button type="button" onClick={() => setAppliedVoucher(null)} className="text-muted hover:text-danger">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Nhập mã..."
                    className="h-10 flex-1 rounded-md border border-line px-3 text-sm outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => { if (voucherCode.trim()) setAppliedVoucher(voucherCode.trim().toUpperCase()); }}
                    className="h-10 rounded-md bg-primary px-4 text-xs font-semibold text-white transition hover:bg-charcoal"
                  >
                    Áp dụng
                  </button>
                </div>
              )}
            </div>

            {/* Order summary */}
            <div className="rounded-lg border border-line bg-background p-5">
              <h2 className="text-lg font-semibold">Đơn hàng</h2>
              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted">Cơm sen An Nhiên × 2</span>
                  <span>{formatVnd(178000)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted">Trà thảo mộc ấm × 1</span>
                  <span>{formatVnd(39000)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted">Bún nấm thanh vị × 1</span>
                  <span>{formatVnd(79000)}</span>
                </div>
              </div>
              <div className="mt-4 grid gap-2 border-t border-line pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Tạm tính</span>
                  <span>{formatVnd(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="inline-flex items-center gap-1 text-muted"><Truck size={14} /> Giao hàng</span>
                  <span>{formatVnd(shippingFee)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Giảm giá</span>
                    <span>-{formatVnd(discount)}</span>
                  </div>
                )}
                <div className="border-t border-line pt-3">
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{formatVnd(total)}</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-white transition hover:bg-charcoal"
              >
                <ShieldCheck size={18} />
                Đặt món • {formatVnd(total)}
              </button>
              <p className="mt-3 text-center text-xs text-muted">
                Bằng việc đặt món, bạn đồng ý với điều khoản sử dụng của An Nhiên.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
