"use client";

import { useState, useMemo } from "react";
import { AdminShell } from "../../../../components/admin-shell";
import { featuredItems } from "../../../../lib/demo-data";
import { formatVnd } from "@an-nhien/shared";
import Image from "next/image";
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  SlidersHorizontal,
  Sprout
} from "lucide-react";

interface AdminMenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  isActive: boolean;
  stockStatus: "in_stock" | "out_of_stock";
  tags?: string[];
}

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "cat-rice", label: "Cơm" },
  { id: "cat-noodle", label: "Bún / Phở" },
  { id: "cat-drink", label: "Thức uống" }
];

export default function AdminMenuPage() {
  const [items, setItems] = useState<AdminMenuItem[]>(featuredItems as AdminMenuItem[]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === "all" || item.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, activeCategory]);

  function toggleStock(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              stockStatus: item.stockStatus === "in_stock" ? "out_of_stock" : "in_stock"
            }
          : item
      )
    );
  }

  function toggleActive(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  }

  function deleteItem(id: string) {
    if (confirm("Bạn có chắc chắn muốn xoá món ăn này khỏi menu không?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  }

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-charcoal">Thực đơn nhà hàng</h1>
            <p className="mt-1 text-sm text-muted">Quản lý danh sách món ăn, giá bán và trạng thái kho</p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:bg-charcoal shadow-soft"
          >
            <Plus size={16} />
            Thêm món mới
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-line bg-white pl-9 pr-4 text-sm outline-none transition focus:border-primary"
            />
          </div>
          <div className="flex gap-1 rounded-lg border border-line bg-white p-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeCategory === cat.id
                    ? "bg-primary text-white"
                    : "text-muted hover:bg-background hover:text-charcoal"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Info label */}
        <p className="text-xs text-muted flex items-center gap-1.5">
          <SlidersHorizontal size={12} />
          Hiển thị {filteredItems.length} món ăn
        </p>

        {/* Grid List */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const isOut = item.stockStatus === "out_of_stock";
            return (
              <article
                key={item.id}
                className={`group relative overflow-hidden rounded-xl border border-line bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg ${
                  !item.isActive ? "opacity-60" : ""
                }`}
              >
                {/* Product Image & tag */}
                <div className="relative h-44 overflow-hidden rounded-lg bg-mint mb-4">
                  <Image
                    src={item.images[0] ?? "/brand-hero.png"}
                    alt={item.name}
                    fill
                    loading="lazy"
                    className="object-cover transition duration-500 group-hover:scale-103"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                  {item.tags?.includes("signature") && (
                    <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-0.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-primary backdrop-blur-sm shadow-soft">
                      <Sprout size={10} />
                      Bán chạy nhất
                    </span>
                  )}
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-bold text-charcoal truncate">{item.name}</h2>
                    <span className="text-sm font-bold text-primary shrink-0">
                      {formatVnd(item.price)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted line-clamp-2 min-h-8">
                    {item.description}
                  </p>
                </div>

                {/* Status Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => toggleStock(item.id)}
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
                      isOut
                        ? "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
                        : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                    }`}
                  >
                    {isOut ? <X size={12} /> : <Check size={12} />}
                    {isOut ? "Hết hàng" : "Còn hàng"}
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleActive(item.id)}
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold transition ${
                      !item.isActive
                        ? "bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200"
                        : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                    }`}
                  >
                    {item.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                    {item.isActive ? "Hiển thị" : "Đã ẩn"}
                  </button>
                </div>

                {/* Actions overlay footer */}
                <div className="mt-4 flex items-center justify-end gap-2 border-t border-line pt-3">
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-white text-muted hover:text-charcoal transition"
                    title="Chỉnh sửa món"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-white text-muted hover:text-rose-600 hover:border-rose-200 transition"
                    title="Xoá món"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
