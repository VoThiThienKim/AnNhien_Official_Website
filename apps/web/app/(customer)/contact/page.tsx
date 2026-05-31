import { CalendarDays, Mail, MapPin, MessageCircle, Navigation, Phone, type LucideIcon } from "lucide-react";
import { AppShell } from "../../../components/app-shell";
import { googleMapsDirectionsUrl, googleMapsEmbedUrl, restaurantInfo } from "../../../lib/restaurant-info";

export default function ContactPage() {
  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-primary">Liên hệ</p>
          <h1 className="mt-2 text-4xl font-semibold">Ghé An Nhiên hoặc nhắn trước cho tụi mình</h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Nhận hỗ trợ đặt món, đặt bàn, đơn nhóm và phản hồi chất lượng trong giờ mở cửa.
          </p>

          <div className="mt-6 grid gap-3">
            <ContactRow icon={MapPin} label="Địa chỉ" value={restaurantInfo.address} />
            <ContactRow icon={Phone} label="Hotline" value={restaurantInfo.phone} href={`tel:${restaurantInfo.phone}`} />
            <ContactRow icon={Mail} label="Email" value={restaurantInfo.email} href={`mailto:${restaurantInfo.email}`} />
            <ContactRow icon={CalendarDays} label="Giờ mở cửa" value={restaurantInfo.hours} />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={googleMapsDirectionsUrl()} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white">
              <Navigation size={18} aria-hidden="true" />
              Chỉ đường
            </a>
            <a href={restaurantInfo.zaloUrl} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center gap-2 rounded-md border border-line bg-white px-4 text-sm font-semibold">
              <MessageCircle size={18} aria-hidden="true" />
              Nhắn Zalo
            </a>
          </div>
          <p className="mt-4 text-xs text-muted">{restaurantInfo.addressNote}</p>
        </div>

        <div className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
          <iframe
            title="Bản đồ An Nhiên"
            src={googleMapsEmbedUrl()}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="grid gap-4 p-5 md:grid-cols-3">
            {[
              ["Giao hàng", restaurantInfo.deliveryRadius],
              ["Bãi xe", "Hỗ trợ xe máy"],
              ["Đơn nhóm", "Liên hệ trước 2 giờ"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-mint p-4">
                <p className="text-sm font-semibold text-primary">{label}</p>
                <p className="mt-1 text-sm text-muted">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a href={href} className="font-semibold text-charcoal hover:text-primary">
      {value}
    </a>
  ) : (
    <span className="font-semibold text-charcoal">{value}</span>
  );

  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 rounded-lg border border-line bg-white p-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-mint text-primary">
        <Icon size={18} aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase text-muted">{label}</p>
        <p className="mt-1 text-sm leading-6">{content}</p>
      </div>
    </div>
  );
}
