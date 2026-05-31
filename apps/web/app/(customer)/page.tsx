import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Leaf,
  MapPinned,
  Navigation,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck
} from "lucide-react";
import { formatVnd } from "@an-nhien/shared";
import { AppShell } from "../../components/app-shell";
import { MenuCard } from "../../components/menu-card";
import { featuredItems, landingHighlights, testimonials } from "../../lib/demo-data";
import { googleMapsDirectionsUrl, restaurantInfo } from "../../lib/restaurant-info";

const steps = [
  {
    title: "Chọn món",
    body: "Xem menu theo nhóm món, trạng thái còn hàng và giá rõ ràng.",
    icon: ShoppingBag
  },
  {
    title: "Tính phí giao",
    body: "Ước tính khoảng cách, chọn phương án giao phù hợp trong bán kính 10km.",
    icon: Truck
  },
  {
    title: "Bếp xác nhận",
    body: "Nhân viên nhận âm báo đơn mới, xác nhận và in phiếu cho bếp.",
    icon: CheckCircle2
  }
];

const policyTeasers = [
  "Giao hàng minh bạch",
  "Đổi trả khi món lỗi",
  "Bảo mật thông tin",
  "Thanh toán an toàn"
];

export default function HomePage() {
  const signatureItems = featuredItems.slice(0, 3);
  const moreItems = featuredItems.slice(3);

  return (
    <AppShell>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/brand-hero.png"
            alt="Không gian và nhận diện An Nhiên"
            fill
            priority
            className="animate-slow-pan object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,245,237,0.98)_0%,rgba(247,245,237,0.9)_42%,rgba(247,245,237,0.48)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl content-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:py-14">
          <div className="reveal flex flex-col justify-center">
            <p className="section-kicker w-fit bg-white/70 backdrop-blur">
              <Leaf size={16} aria-hidden="true" />
              Modern Plant Bistro
            </p>
            <h1 className="mt-5 max-w-2xl text-6xl font-semibold leading-[0.96] text-charcoal sm:text-7xl">
              An Nhiên
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
              Món chay tươi lành, giao nhanh trong bán kính 10km và đặt bàn nhẹ nhàng cho bữa ăn an yên.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/menu" className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-white transition hover:bg-charcoal">
                <ShoppingBag size={18} aria-hidden="true" />
                Đặt món ngay
              </Link>
              <Link href="/booking" className="inline-flex h-12 items-center gap-2 rounded-md border border-line bg-white px-5 text-sm font-semibold text-charcoal transition hover:bg-mint">
                <CalendarDays size={18} aria-hidden="true" />
                Đặt bàn
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { label: restaurantInfo.hours, icon: Clock },
                { label: "Freeship từ 500k", icon: Truck },
                { label: "COD, Momo, VNPay", icon: ShieldCheck }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className={`reveal reveal-delay-${index + 1} glass-panel rounded-lg px-4 py-3 text-sm font-medium text-primary`}>
                    <Icon className="mb-2" size={18} aria-hidden="true" />
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="reveal reveal-delay-2 hidden items-end justify-end lg:flex">
            <div className="glass-panel animate-float-soft max-w-sm rounded-lg p-5">
              <p className="text-sm font-semibold text-muted">Combo gợi ý</p>
              <p className="mt-2 text-2xl font-semibold text-primary">{formatVnd(247000)}</p>
              <p className="mt-1 max-w-[260px] text-sm leading-6 text-muted">
                Cơm sen, bún nấm và trà thảo mộc cho bữa trưa nhẹ vị.
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-mint">
                <div className="h-full w-2/3 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 md:grid-cols-3">
        {landingHighlights.map((item, index) => (
          <article key={item.title} className={`reveal reveal-delay-${index + 1} glass-panel rounded-lg p-5`}>
            <Sparkles className="text-accent" size={22} aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="relative overflow-hidden py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase text-primary">Menu nổi bật</p>
              <h2 className="mt-2 text-3xl font-semibold">Món tươi trong ngày</h2>
            </div>
            <Link href="/menu" className="inline-flex h-10 items-center gap-2 rounded-md bg-white/78 px-3 text-sm font-semibold text-primary shadow-soft backdrop-blur">
              Xem toàn bộ menu
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {signatureItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {moreItems.map((item) => (
              <article key={item.id} className="editorial-panel grid grid-cols-[112px_1fr] gap-4 overflow-hidden rounded-lg p-3 transition hover:-translate-y-1">
                <div className="relative min-h-[112px] overflow-hidden rounded-md bg-mint">
                  <Image
                    src={item.images[0] ?? "/brand-hero.png"}
                    alt={item.name}
                    fill
                    loading="lazy"
                    className="object-cover transition duration-700 hover:scale-105"
                    sizes="112px"
                  />
                </div>
                <div className="min-w-0 py-1">
                  <p className="line-clamp-1 text-sm font-semibold text-primary">{item.name}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{item.description}</p>
                  <p className="mt-3 font-semibold text-charcoal">{formatVnd(item.price)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Quy trình</p>
          <h2 className="mt-2 text-3xl font-semibold">Từ menu đến bếp trong vài bước</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Flow beta tập trung vào đặt món nhanh, xác nhận bếp rõ và vận hành staff dashboard không bị rối.
          </p>
        </div>
        <div className="grid gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="editorial-panel grid gap-4 rounded-lg p-5 sm:grid-cols-[48px_1fr]">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-wood">Bước {index + 1}</p>
                  <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr]">
          <div className="glass-panel rounded-lg p-6">
            <p className="text-sm font-semibold uppercase text-primary">Đặt bàn</p>
            <h2 className="mt-2 text-3xl font-semibold">Không gian sáng cho bữa ăn chậm lại</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Đặt bàn theo ngày, giờ, số người. Nhóm trên 6 người được giữ chỗ bằng cọc online để bếp chuẩn bị tốt hơn.
            </p>
            <Link href="/booking" className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white">
              <CalendarDays size={18} aria-hidden="true" />
              Đặt bàn ngay
            </Link>
          </div>
          <div className="editorial-panel rounded-lg p-6">
            <p className="text-sm font-semibold uppercase text-primary">Chính sách rõ ràng</p>
            <h2 className="mt-2 text-3xl font-semibold">Đặt món an tâm hơn</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {policyTeasers.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-md bg-white/80 px-3 py-3 text-sm font-semibold text-charcoal">
                  <CheckCircle2 size={16} className="text-primary" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/policies" className="mt-5 inline-flex h-11 items-center gap-2 rounded-md border border-primary px-4 text-sm font-semibold text-primary">
              Xem chính sách
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase text-primary">Cảm nhận khách hàng</p>
          <h2 className="mt-2 text-3xl font-semibold">Nhẹ vị, dễ quay lại</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="glass-panel rounded-lg p-5">
              <p className="text-sm leading-6 text-muted">“{item.quote}”</p>
              <p className="mt-4 font-semibold">{item.name}</p>
              <p className="text-sm text-primary">{item.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-charcoal py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-white/70">Ghé An Nhiên</p>
            <h2 className="mt-2 text-3xl font-semibold">Chỉ đường từ Google Maps</h2>
            <p className="mt-3 text-sm leading-6 text-white/70">{restaurantInfo.address}</p>
            <p className="mt-2 text-xs text-white/50">{restaurantInfo.addressNote}</p>
            <a
              href={googleMapsDirectionsUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-11 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-charcoal"
            >
              <Navigation size={18} aria-hidden="true" />
              Mở chỉ đường
            </a>
          </div>
          <div className="min-h-[320px] overflow-hidden rounded-lg border border-white/15 bg-white/10">
            <iframe
              title="Bản đồ An Nhiên"
              src={`https://www.google.com/maps?q=${encodeURIComponent(restaurantInfo.mapsQuery)}&output=embed`}
              className="h-full min-h-[320px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="glass-panel rounded-lg p-6 text-center">
          <MapPinned className="mx-auto text-primary" size={28} aria-hidden="true" />
          <h2 className="mt-3 text-3xl font-semibold">Sẵn sàng cho bữa chay hôm nay?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted">
            Chọn món, đặt bàn hoặc liên hệ nhân viên để được hỗ trợ nhanh trong giờ mở cửa.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/menu" className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white">
              Đặt món
            </Link>
            <Link href="/contact" className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-4 text-sm font-semibold">
              Liên hệ
            </Link>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
