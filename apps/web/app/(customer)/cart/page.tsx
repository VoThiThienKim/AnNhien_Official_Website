"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from "lucide-react";
import { AppShell } from "../../../components/app-shell";
import { featuredItems } from "../../../lib/demo-data";
import { formatVnd } from "@an-nhien/shared";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  note?: string;
}

const initialCart: CartItem[] = [
  { id: "item-lotus-rice", name: "Cơm sen An Nhiên", price: 89000, quantity: 2, image: "/menu/Com_Sen_An_Nhien.png" },
  { id: "item-mushroom-noodle", name: "Bún nấm thanh vị", price: 79000, quantity: 1, image: "/menu/Bun_Nam_An_Nhien.png" },
  { id: "item-herbal-tea", name: "Trà thảo mộc ấm", price: 39000, quantity: 1, image: "/menu/Tra_Thao_Moc_Am.png" }
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialCart);
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 500000 ? 0 : 34000;
  const discount = appliedVoucher ? Math.min(subtotal * 0.1, 50000) : 0;
  const total = subtotal + shippingFee - discount;

  function updateQuantity(id: string, delta: number) {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function applyVoucher() {
    if (voucherCode.trim() && subtotal >= 200000) {
      setAppliedVoucher(voucherCode.trim().toUpperCase());
    }
  }

  if (items.length === 0) {
    return (
      <AppShell>
        <section className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-20 text-center sm:px-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-mint">
            <ShoppingBag className="text-primary" size={36} aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-semibold">Giỏ hàng trống</h1>
          <p className="max-w-sm text-sm text-muted">Khám phá menu An Nhiên và thêm món vào giỏ để bắt đầu đặt hàng.</p>
          <Link
            href="/menu"
            className="mt-3 inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-white transition hover:bg-charcoal"
          >
            <ShoppingBag size={18} aria-hidden="true" />
            Xem menu
          </Link>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_380px]">
        {/* Cart items */}
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Giỏ hàng</h1>
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
              {items.reduce((sum, i) => sum + i.quantity, 0)} món
            </span>
          </div>
          <div className="mt-5 grid gap-3">
            {items.map((item, index) => (
              <article
                key={item.id}
                className="reveal group grid grid-cols-[80px_1fr] gap-4 rounded-lg border border-line bg-white p-4 transition hover:shadow-soft"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="relative h-[80px] overflow-hidden rounded-md bg-mint">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate font-semibold">{item.name}</h2>
                      <p className="text-sm text-primary">{formatVnd(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted transition hover:bg-danger/10 hover:text-danger"
                      aria-label={`Xoá ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 rounded-lg border border-line">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-l-md text-muted transition hover:bg-mint hover:text-primary"
                        aria-label="Giảm số lượng"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="flex h-8 w-10 items-center justify-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-r-md text-muted transition hover:bg-mint hover:text-primary"
                        aria-label="Tăng số lượng"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-semibold text-charcoal">{formatVnd(item.price * item.quantity)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <Link href="/menu" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-charcoal">
            <Plus size={16} /> Thêm món khác
          </Link>
        </div>

        {/* Order summary sidebar */}
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
                  onClick={applyVoucher}
                  className="h-10 rounded-md bg-primary px-4 text-xs font-semibold text-white transition hover:bg-charcoal"
                >
                  Áp dụng
                </button>
              </div>
            )}
            {subtotal < 200000 && !appliedVoucher && (
              <p className="mt-2 text-xs text-wood">Đơn tối thiểu 200.000đ để dùng voucher</p>
            )}
          </div>

          {/* Summary */}
          <div className="rounded-lg border border-line bg-background p-5">
            <h2 className="text-lg font-semibold">Tạm tính</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Món ăn ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>{formatVnd(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Phí giao hàng</span>
                <span className={shippingFee === 0 ? "font-semibold text-primary" : ""}>
                  {shippingFee === 0 ? "Miễn phí" : formatVnd(shippingFee)}
                </span>
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
            <Link
              href="/checkout"
              className="mt-5 flex h-12 w-full items-center justify-center rounded-md bg-primary text-sm font-semibold text-white transition hover:bg-charcoal"
            >
              Thanh toán • {formatVnd(total)}
            </Link>
            {subtotal < 500000 && shippingFee > 0 && (
              <p className="mt-3 text-center text-xs text-muted">
                Thêm {formatVnd(500000 - subtotal)} để được miễn phí giao hàng 🚛
              </p>
            )}
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
