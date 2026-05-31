"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Leaf, Lock, Mail, Phone, User } from "lucide-react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left - brand panel */}
      <div className="relative hidden w-[45%] overflow-hidden bg-primary lg:block">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,195,74,0.4),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(185,130,75,0.3),transparent_50%)]" />
        </div>
        <div className="relative flex h-full flex-col items-center justify-center px-10 text-center text-white">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Leaf size={36} />
          </div>
          <h1 className="text-4xl font-semibold">An Nhiên</h1>
          <p className="mt-2 text-lg text-white/80">Nhà hàng chay</p>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-7 text-white/60">
            Đặt món tươi lành, đặt bàn nhẹ nhàng, tích điểm thân thiết và nhận ưu đãi riêng cho mỗi bữa ăn an yên.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center text-xs text-white/50">
            <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
              <p className="text-lg font-semibold text-white/80">300+</p>
              <p>Đơn / ngày</p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
              <p className="text-lg font-semibold text-white/80">10km</p>
              <p>Bán kính giao</p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 backdrop-blur">
              <p className="text-lg font-semibold text-white/80">⭐ 4.8</p>
              <p>Đánh giá</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right - form */}
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <Leaf size={22} />
            </div>
            <span className="text-lg font-semibold">An Nhiên</span>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex rounded-lg bg-white p-1 shadow-soft">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-md py-2.5 text-sm font-semibold transition ${
                mode === "login" ? "bg-primary text-white" : "text-muted hover:text-charcoal"
              }`}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 rounded-md py-2.5 text-sm font-semibold transition ${
                mode === "register" ? "bg-primary text-white" : "text-muted hover:text-charcoal"
              }`}
            >
              Tạo tài khoản
            </button>
          </div>

          <h2 className="text-2xl font-semibold">
            {mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản mới"}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {mode === "login"
              ? "Đăng nhập để đặt món, theo dõi đơn hàng và tích điểm."
              : "Đăng ký để nhận ưu đãi khách mới và bắt đầu tích điểm."}
          </p>

          <form className="mt-6 grid gap-4">
            {mode === "register" && (
              <label className="grid gap-1.5 text-sm font-medium">
                Họ tên
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input
                    className="h-11 w-full rounded-md border border-line bg-white pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
              </label>
            )}
            <label className="grid gap-1.5 text-sm font-medium">
              Số điện thoại hoặc Email
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  className="h-11 w-full rounded-md border border-line bg-white pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="090... hoặc email@example.com"
                />
              </div>
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              Mật khẩu
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  className="h-11 w-full rounded-md border border-line bg-white pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-muted">
                  <input type="checkbox" className="accent-primary" /> Nhớ đăng nhập
                </label>
                <a href="#" className="font-semibold text-primary hover:underline">Quên mật khẩu?</a>
              </div>
            )}

            <button
              type="button"
              className="mt-2 h-12 rounded-md bg-primary text-sm font-semibold text-white transition hover:bg-charcoal"
            >
              {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            {mode === "login" ? (
              <>Chưa có tài khoản?{" "}
                <button type="button" onClick={() => setMode("register")} className="font-semibold text-primary hover:underline">
                  Đăng ký ngay
                </button>
              </>
            ) : (
              <>Đã có tài khoản?{" "}
                <button type="button" onClick={() => setMode("login")} className="font-semibold text-primary hover:underline">
                  Đăng nhập
                </button>
              </>
            )}
          </p>

          <div className="mt-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary">
              ← Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
