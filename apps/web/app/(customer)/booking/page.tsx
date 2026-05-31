"use client";

import { useState } from "react";
import { CalendarDays, Clock, Info, Leaf, MapPin, Users } from "lucide-react";
import { AppShell } from "../../../components/app-shell";
import { formatVnd } from "@an-nhien/shared";

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
];

const seatOptions = [
  { label: "Bàn 2 người", seats: 2, icon: "🪴" },
  { label: "Bàn 4 người", seats: 4, icon: "🌿" },
  { label: "Bàn 6 người", seats: 6, icon: "🍃" },
  { label: "Nhóm 8+", seats: 8, icon: "🌳" }
];

export default function BookingPage() {
  const [selectedTime, setSelectedTime] = useState("18:00");
  const [selectedSeats, setSelectedSeats] = useState(4);
  const [guestCount, setGuestCount] = useState(4);
  const needsDeposit = guestCount > 6;
  const depositAmount = needsDeposit ? guestCount * 150000 : 0;

  return (
    <AppShell>
      {/* Hero */}
      <div className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(234,244,232,0.5),transparent_60%)]" />
        </div>
        <div className="relative mx-auto flex max-w-7xl items-center gap-6 px-4 py-10 sm:px-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <CalendarDays className="text-white" size={28} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Đặt bàn tại An Nhiên</h1>
            <p className="mt-1 text-sm text-white/70">
              Giữ chỗ cho bữa ăn an yên • Mở cửa 08:00–21:00 hằng ngày
            </p>
          </div>
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          {/* Guest info */}
          <div className="rounded-lg border border-line bg-white p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Users size={20} className="text-primary" />
              Thông tin khách
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                Họ tên
                <input
                  className="h-11 rounded-md border border-line px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Tên khách đặt bàn"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Số điện thoại
                <input
                  className="h-11 rounded-md border border-line px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="090..."
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Email
                <input
                  type="email"
                  className="h-11 rounded-md border border-line px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="email@example.com"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Ngày đặt
                <input
                  type="date"
                  className="h-11 rounded-md border border-line px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>
          </div>

          {/* Time slot picker */}
          <div className="rounded-lg border border-line bg-white p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Clock size={20} className="text-primary" />
              Chọn giờ
            </h2>
            <div className="mt-1 text-xs text-muted">Chọn khung giờ phù hợp cho bữa ăn</div>
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase text-muted">Buổi sáng / trưa</p>
              <div className="flex flex-wrap gap-2">
                {timeSlots.filter((t) => parseInt(t) < 14).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                      selectedTime === slot
                        ? "bg-primary text-white shadow-[0_4px_14px_rgba(47,107,79,0.3)]"
                        : "border border-line bg-background text-charcoal hover:border-primary hover:text-primary"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <p className="mb-2 mt-4 text-xs font-semibold uppercase text-muted">Buổi chiều / tối</p>
              <div className="flex flex-wrap gap-2">
                {timeSlots.filter((t) => parseInt(t) >= 14).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                      selectedTime === slot
                        ? "bg-primary text-white shadow-[0_4px_14px_rgba(47,107,79,0.3)]"
                        : "border border-line bg-background text-charcoal hover:border-primary hover:text-primary"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Seat selector */}
          <div className="rounded-lg border border-line bg-white p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <MapPin size={20} className="text-primary" />
              Loại bàn & số người
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {seatOptions.map((opt) => (
                <button
                  key={opt.seats}
                  type="button"
                  onClick={() => { setSelectedSeats(opt.seats); setGuestCount(opt.seats); }}
                  className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition ${
                    selectedSeats === opt.seats ? "border-primary bg-mint/40" : "border-line hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <p className="text-sm font-semibold">{opt.label}</p>
                    <p className="text-xs text-muted">{opt.seats > 6 ? "Cọc 100% bắt buộc" : "Không cần cọc"}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4">
              <label className="grid gap-1.5 text-sm font-medium">
                Số người chính xác
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="h-11 w-32 rounded-md border border-line px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>
          </div>

          {/* Special requests */}
          <div className="rounded-lg border border-line bg-white p-5">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Leaf size={20} className="text-primary" />
              Yêu cầu đặc biệt
            </h2>
            <textarea
              className="mt-3 min-h-24 w-full rounded-md border border-line px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="VD: Bàn yên tĩnh, ghế trẻ em, dị ứng thực phẩm..."
            />
          </div>
        </div>

        {/* Summary sidebar */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-20">
          <div className="rounded-lg border border-line bg-background p-5">
            <h2 className="text-lg font-semibold">Tóm tắt đặt bàn</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Khung giờ</span>
                <span className="font-semibold text-primary">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Số người</span>
                <span className="font-semibold">{guestCount} người</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Loại bàn</span>
                <span>{seatOptions.find((o) => o.seats === selectedSeats)?.label}</span>
              </div>
            </div>

            {needsDeposit && (
              <div className="mt-4 rounded-lg bg-wood/10 p-4">
                <div className="flex items-start gap-2">
                  <Info size={16} className="mt-0.5 shrink-0 text-wood" />
                  <div>
                    <p className="text-sm font-semibold text-wood">Bắt buộc đặt cọc</p>
                    <p className="mt-1 text-xs text-muted">
                      Nhóm trên 6 người cần cọc 100% để quán chuẩn bị bàn và món.
                    </p>
                    <p className="mt-2 text-lg font-semibold text-wood">{formatVnd(depositAmount)}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-white transition hover:bg-charcoal"
            >
              <CalendarDays size={18} />
              {needsDeposit ? `Đặt bàn & cọc ${formatVnd(depositAmount)}` : "Xác nhận đặt bàn"}
            </button>

            {!needsDeposit && (
              <p className="mt-3 text-center text-xs text-muted">
                Không cần cọc, xác nhận qua Email / Zalo trong 15 phút.
              </p>
            )}
          </div>

          {/* Info cards */}
          <div className="grid gap-3">
            {[
              { icon: Clock, label: "Giờ mở cửa", value: "08:00 – 21:00 hằng ngày" },
              { icon: Users, label: "Sức chứa", value: "Tối đa 30 người / lượt" },
              { icon: MapPin, label: "Địa điểm", value: "123 Nguyễn Thị Minh Khai, Q.1" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-lg border border-line bg-white p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-mint text-primary">
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase text-muted">{item.label}</p>
                    <p className="truncate text-sm font-medium">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
