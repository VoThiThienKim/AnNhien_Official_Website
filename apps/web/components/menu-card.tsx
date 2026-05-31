import Image from "next/image";
import { Plus, Sprout } from "lucide-react";
import type { MenuItem } from "@an-nhien/shared";
import { formatVnd } from "@an-nhien/shared";

export function MenuCard({ item }: { item: MenuItem }) {
  const isOut = item.stockStatus === "out_of_stock";

  return (
    <article className="grid min-h-[360px] overflow-hidden rounded-lg border border-white/70 bg-white/78 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(47,49,45,0.12)]">
      <div className="relative min-h-[170px]">
        <Image
          src={item.images[0] ?? "/brand-hero.png"}
          alt={item.name}
          fill
          loading="lazy"
          className="object-cover transition duration-700 hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/78 px-2 py-1 text-xs font-semibold text-primary backdrop-blur-md">
          <Sprout size={14} aria-hidden="true" />
          Fresh
        </span>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div>
          <h3 className="text-lg font-semibold text-charcoal">{item.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{item.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-base font-semibold text-primary">{formatVnd(item.price)}</span>
          <button
            disabled={isOut}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-3 text-sm font-semibold text-white disabled:bg-line disabled:text-muted"
            type="button"
          >
            <Plus size={16} aria-hidden="true" />
            {isOut ? "Hết món" : "Thêm"}
          </button>
        </div>
      </div>
    </article>
  );
}
