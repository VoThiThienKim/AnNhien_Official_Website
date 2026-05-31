import Link from "next/link";
import { CalendarDays, Mail, MapPin, Navigation, Phone, Sprout } from "lucide-react";
import { googleMapsDirectionsUrl, restaurantInfo } from "../lib/restaurant-info";

const policyLinks = [
  { href: "/policies", label: "Tổng quan chính sách" },
  { href: "/policies/privacy", label: "Bảo mật thông tin" },
  { href: "/policies/shipping", label: "Giao hàng" },
  { href: "/policies/refund", label: "Đổi trả & hoàn tiền" },
  { href: "/policies/terms", label: "Điều khoản sử dụng" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-charcoal text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Sprout size={22} aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">{restaurantInfo.name}</p>
              <p className="text-sm text-white/70">{restaurantInfo.tagline}</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
            Món chay tươi lành, không gian sáng và dịch vụ đặt món - đặt bàn được thiết kế cho nhịp sống hiện đại.
          </p>
          <a
            href={googleMapsDirectionsUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-white px-3 text-sm font-semibold text-charcoal"
          >
            <Navigation size={16} aria-hidden="true" />
            Chỉ đường Google Maps
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase text-white/80">Liên hệ</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 shrink-0" size={16} aria-hidden="true" />
              <span>{restaurantInfo.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} aria-hidden="true" />
              <a href={`tel:${restaurantInfo.phone}`}>{restaurantInfo.phone}</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} aria-hidden="true" />
              <a href={`mailto:${restaurantInfo.email}`}>{restaurantInfo.email}</a>
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays size={16} aria-hidden="true" />
              {restaurantInfo.hours}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase text-white/80">Chính sách</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            {policyLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60">
        © 2026 An Nhiên Vegan Cuisine. Built for beta operations.
      </div>
    </footer>
  );
}
