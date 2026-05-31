"use client";

import { useState, useMemo } from "react";
import { Search, Grid3x3, List, SlidersHorizontal, Leaf } from "lucide-react";
import { AppShell } from "../../../components/app-shell";
import { MenuCard } from "../../../components/menu-card";
import { MenuListItem } from "../../../components/menu-list-item";
import { featuredItems } from "../../../lib/demo-data";

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "cat-rice", label: "Cơm" },
  { id: "cat-noodle", label: "Bún / Phở" },
  { id: "cat-drink", label: "Thức uống" }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredItems = useMemo(() => {
    let items = featuredItems;
    if (activeCategory !== "all") {
      items = items.filter((item) => item.categoryId === activeCategory);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  return (
    <AppShell>
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,195,74,0.4),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(185,130,75,0.3),transparent_50%)]" />
        </div>
        <div className="relative mx-auto flex max-w-7xl items-center gap-6 px-4 py-10 sm:px-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            <Leaf className="text-white" size={28} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Thực đơn An Nhiên</h1>
            <p className="mt-1 text-sm text-white/70">
              {featuredItems.length} món • Rau củ tươi mỗi ngày • Giao hàng 08:00–21:00
            </p>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Search & filter bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              size={18}
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Tìm món ăn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full min-w-[200px] rounded-lg border border-line bg-white pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-line bg-white p-1">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex h-9 w-9 items-center justify-center rounded-md transition ${viewMode === "grid" ? "bg-primary text-white" : "text-muted hover:text-charcoal"}`}
              aria-label="Xem dạng lưới"
            >
              <Grid3x3 size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex h-9 w-9 items-center justify-center rounded-md transition ${viewMode === "list" ? "bg-primary text-white" : "text-muted hover:text-charcoal"}`}
              aria-label="Xem dạng danh sách"
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-[0_4px_14px_rgba(47,107,79,0.3)]"
                  : "border border-line bg-white text-charcoal hover:border-primary hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="mt-4 text-sm text-muted">
          <SlidersHorizontal className="mr-1.5 inline" size={14} aria-hidden="true" />
          {filteredItems.length} món{activeCategory !== "all" ? ` trong "${categories.find((c) => c.id === activeCategory)?.label}"` : ""}
          {searchQuery && ` • từ khoá "${searchQuery}"`}
        </p>

        {/* Items */}
        {filteredItems.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mint">
              <Search className="text-primary" size={28} />
            </div>
            <h2 className="text-xl font-semibold text-charcoal">Không tìm thấy món</h2>
            <p className="max-w-sm text-sm text-muted">
              Thử từ khoá khác hoặc chọn danh mục khác để khám phá menu An Nhiên.
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
              className="mt-2 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white"
            >
              Xem tất cả menu
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <div key={item.id} className="reveal" style={{ animationDelay: `${index * 60}ms` }}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 grid gap-3">
            {filteredItems.map((item, index) => (
              <div key={item.id} className="reveal" style={{ animationDelay: `${index * 40}ms` }}>
                <MenuListItem item={item} />
              </div>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
