import Image from "next/image";
import { Plus, Sprout } from "lucide-react";
import type { MenuItem } from "@an-nhien/shared";
import { formatVnd } from "@an-nhien/shared";

export function MenuListItem({ item }: { item: MenuItem }) {
  const isOut = item.stockStatus === "out_of_stock";

  return (
    <article className="group grid grid-cols-[100px_1fr_auto] items-center gap-4 overflow-hidden rounded-lg border border-white/70 bg-white/78 p-3 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(47,49,45,0.12)]">
      <div className="relative h-[80px] w-[100px] overflow-hidden rounded-md bg-mint">
        <Image
          src={item.images[0] ?? "/brand-hero.png"}
          alt={item.name}
          fill
          loading="lazy"
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="100px"
        />
        {item.tags?.includes("signature") && (
          <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-0.5 rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-bold text-primary backdrop-blur-sm">
            <Sprout size={10} aria-hidden="true" />
            Đặc biệt
          </span>
        )}
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-charcoal">{item.name}</h3>
        <p className="mt-1 line-clamp-1 text-xs leading-5 text-muted">{item.description}</p>
        <span className="mt-1.5 inline-block text-sm font-semibold text-primary">{formatVnd(item.price)}</span>
      </div>
      <button
        disabled={isOut}
        className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-semibold text-white transition hover:bg-charcoal disabled:bg-line disabled:text-muted"
        type="button"
      >
        <Plus size={14} aria-hidden="true" />
        {isOut ? "Hết" : "Thêm"}
      </button>
    </article>
  );
}
