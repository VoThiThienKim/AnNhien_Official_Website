"use client";

import { useState, useMemo } from "react";
import { AdminShell } from "../../../../components/admin-shell";
import { formatVnd } from "@an-nhien/shared";
import { 
  Search, 
  Filter, 
  Printer, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  AlertCircle, 
  ShoppingBag,
  FileText
} from "lucide-react";

interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface AdminOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  status: "pending" | "confirmed" | "preparing" | "shipping" | "delivered" | "cancelled";
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  items: OrderItem[];
  createdAt: string;
}

const initialOrders: AdminOrder[] = [
  {
    id: "AN-240601-001",
    customerName: "Minh Anh",
    customerPhone: "0900 000 000",
    address: "123 Lê Lợi, Bến Thành, Quận 1, TP.HCM",
    status: "pending",
    subtotal: 217000,
    shippingFee: 34000,
    discount: 20000,
    total: 231000,
    paymentMethod: "COD",
    paymentStatus: "Chưa thanh toán",
    items: [
      { itemId: "item-lotus-rice", name: "Cơm sen An Nhiên", quantity: 2, unitPrice: 89000 },
      { itemId: "item-herbal-tea", name: "Trà thảo mộc ấm", quantity: 1, unitPrice: 39000 }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: "AN-240531-012",
    customerName: "Hoàng Nam",
    customerPhone: "0988 777 666",
    address: "456 Điện Biên Phủ, Phường 22, Bình Thạnh, TP.HCM",
    status: "preparing",
    subtotal: 247000,
    shippingFee: 34000,
    discount: 0,
    total: 281000,
    paymentMethod: "MoMo",
    paymentStatus: "Đã thanh toán",
    items: [
      { itemId: "item-green-curry", name: "Cà ri xanh rau củ", quantity: 2, unitPrice: 99000 },
      { itemId: "item-herbal-tea", name: "Trà thảo mộc ấm", quantity: 1, unitPrice: 39000 }
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "AN-240531-005",
    customerName: "Chị Vy",
    customerPhone: "0933 444 555",
    address: "789 Nguyễn Đình Chiểu, Quận 3, TP.HCM",
    status: "delivered",
    subtotal: 158000,
    shippingFee: 22000,
    discount: 15000,
    total: 165000,
    paymentMethod: "VNPay",
    paymentStatus: "Đã thanh toán",
    items: [
      { itemId: "item-mushroom-noodle", name: "Bún nấm thanh vị", quantity: 2, unitPrice: 79000 }
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "AN-240530-008",
    customerName: "Anh Hùng",
    customerPhone: "0909 999 888",
    address: "101 Nguyễn Thị Thập, Tân Phong, Quận 7, TP.HCM",
    status: "cancelled",
    subtotal: 189000,
    shippingFee: 34000,
    discount: 0,
    total: 223000,
    paymentMethod: "COD",
    paymentStatus: "Đã huỷ",
    items: [
      { itemId: "item-mushroom-hotpot", name: "Lẩu nấm chay", quantity: 1, unitPrice: 189000 }
    ],
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

const statusStyles: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  pending: { label: "Chờ xác nhận", color: "text-amber-700 border-amber-200", bg: "bg-amber-50", icon: Clock },
  confirmed: { label: "Đã xác nhận", color: "text-blue-700 border-blue-200", bg: "bg-blue-50", icon: CheckCircle2 },
  preparing: { label: "Đang chuẩn bị", color: "text-purple-700 border-purple-200", bg: "bg-purple-50", icon: FileText },
  shipping: { label: "Đang giao", color: "text-orange-700 border-orange-200", bg: "bg-orange-50", icon: Truck },
  delivered: { label: "Đã giao", color: "text-emerald-700 border-emerald-200", bg: "bg-emerald-50", icon: CheckCircle2 },
  cancelled: { label: "Đã huỷ", color: "text-rose-700 border-rose-200", bg: "bg-rose-50", icon: XCircle }
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(initialOrders[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Metrics
  const metrics = useMemo(() => {
    return {
      pending: orders.filter((o) => o.status === "pending").length,
      preparing: orders.filter((o) => o.status === "preparing").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      totalRevenue: orders.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.total, 0)
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.includes(searchQuery);
      
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  function changeStatus(id: string, newStatus: AdminOrder["status"]) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const updated = { ...o, status: newStatus };
          if (selectedOrder?.id === id) {
            setSelectedOrder(updated);
          }
          return updated;
        }
        return o;
      })
    );
  }

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-charcoal">Đơn hàng</h1>
            <p className="mt-1 text-sm text-muted">Xem, xác nhận và quản lý đơn hàng online</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-white p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase text-muted">Chờ xác nhận</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-3xl font-bold text-amber-600">{metrics.pending}</span>
              <span className="rounded-full bg-amber-50 p-2.5 text-amber-600"><Clock size={20} /></span>
            </div>
          </div>
          <div className="rounded-xl border border-line bg-white p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase text-muted">Đang chuẩn bị</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-3xl font-bold text-purple-600">{metrics.preparing}</span>
              <span className="rounded-full bg-purple-50 p-2.5 text-purple-600"><FileText size={20} /></span>
            </div>
          </div>
          <div className="rounded-xl border border-line bg-white p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase text-muted">Đã giao hôm nay</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-3xl font-bold text-emerald-600">{metrics.delivered}</span>
              <span className="rounded-full bg-emerald-50 p-2.5 text-emerald-600"><CheckCircle2 size={20} /></span>
            </div>
          </div>
          <div className="rounded-xl border border-line bg-white p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase text-muted">Doanh thu đã giao</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">{formatVnd(metrics.totalRevenue)}</span>
              <span className="rounded-full bg-mint p-2.5 text-primary"><ShoppingBag size={20} /></span>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input
              type="text"
              placeholder="Tìm theo mã đơn, tên hoặc số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-line bg-white pl-9 pr-4 text-sm outline-none transition focus:border-primary"
            />
          </div>
          <div className="flex flex-wrap gap-1 rounded-lg border border-line bg-white p-1">
            {["all", "pending", "confirmed", "preparing", "shipping", "delivered", "cancelled"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  statusFilter === status
                    ? "bg-primary text-white"
                    : "text-muted hover:bg-background hover:text-charcoal"
                }`}
              >
                {status === "all" ? "Tất cả" : statusStyles[status].label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Section */}
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* Table Container */}
          <div className="overflow-hidden rounded-xl border border-line bg-white shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="border-b border-line bg-background text-muted">
                  <tr>
                    <th className="p-4 font-semibold">Mã đơn</th>
                    <th className="p-4 font-semibold">Khách hàng</th>
                    <th className="p-4 font-semibold">Trạng thái</th>
                    <th className="p-4 font-semibold text-right">Tổng tiền</th>
                    <th className="p-4 font-semibold text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-muted">
                        Không tìm thấy đơn hàng nào phù hợp
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const st = statusStyles[order.status];
                      const StIcon = st.icon;
                      const isSelected = selectedOrder?.id === order.id;

                      return (
                        <tr
                          key={order.id}
                          onClick={() => setSelectedOrder(order)}
                          className={`cursor-pointer transition hover:bg-background/50 ${
                            isSelected ? "bg-mint/30" : ""
                          }`}
                        >
                          <td className="p-4 font-semibold text-charcoal">{order.id}</td>
                          <td className="p-4">
                            <p className="font-semibold text-charcoal">{order.customerName}</p>
                            <p className="text-xs text-muted">{order.customerPhone}</p>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${st.color} ${st.bg}`}>
                              <StIcon size={12} />
                              {st.label}
                            </span>
                          </td>
                          <td className="p-4 text-right font-semibold text-primary">
                            {formatVnd(order.total)}
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={() => setSelectedOrder(order)}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line bg-white text-muted hover:text-charcoal"
                                title="Xem chi tiết"
                              >
                                <Eye size={14} />
                              </button>
                              <button
                                type="button"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white hover:bg-charcoal"
                                title="In hóa đơn"
                              >
                                <Printer size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right sidebar order details */}
          <aside className="space-y-4">
            {selectedOrder ? (
              <div className="rounded-xl border border-line bg-white p-5 shadow-soft">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-charcoal">{selectedOrder.id}</h2>
                    <p className="text-xs text-muted">
                      {new Date(selectedOrder.createdAt).toLocaleTimeString("vi")} • {new Date(selectedOrder.createdAt).toLocaleDateString("vi")}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-line bg-white px-2.5 text-xs font-semibold text-muted hover:text-charcoal"
                  >
                    <Printer size={12} />
                    In 2 liên
                  </button>
                </div>

                {/* Customer Details */}
                <div className="py-4">
                  <h3 className="text-xs font-bold uppercase text-muted">Thông tin giao hàng</h3>
                  <p className="mt-2 text-sm font-semibold text-charcoal">{selectedOrder.customerName}</p>
                  <p className="text-sm text-muted">{selectedOrder.customerPhone}</p>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{selectedOrder.address}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded bg-background px-2 py-0.5 font-semibold text-muted">
                      Ship: Giao nhanh
                    </span>
                    <span className="rounded bg-background px-2 py-0.5 font-semibold text-muted">
                      Thanh toán: {selectedOrder.paymentMethod}
                    </span>
                    <span className="rounded bg-background px-2 py-0.5 font-semibold text-muted">
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t border-line py-4">
                  <h3 className="text-xs font-bold uppercase text-muted">Chi tiết món ăn</h3>
                  <div className="mt-3 space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.name} className="flex justify-between text-sm">
                        <span className="text-charcoal">
                          {item.name} <span className="font-semibold text-muted">× {item.quantity}</span>
                        </span>
                        <span className="font-medium text-charcoal">
                          {formatVnd(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-line pt-3 space-y-1.5 text-xs text-muted">
                    <div className="flex justify-between">
                      <span>Tạm tính</span>
                      <span>{formatVnd(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí giao hàng</span>
                      <span>{formatVnd(selectedOrder.shippingFee)}</span>
                    </div>
                    {selectedOrder.discount > 0 && (
                      <div className="flex justify-between text-primary">
                        <span>Giảm giá</span>
                        <span>-{formatVnd(selectedOrder.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-line pt-2 text-sm font-bold text-charcoal">
                      <span>Tổng cộng</span>
                      <span className="text-primary text-base">{formatVnd(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Admin Actions */}
                <div className="border-t border-line pt-4 space-y-2">
                  <h3 className="text-xs font-bold uppercase text-muted">Cập nhật trạng thái</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedOrder.status === "pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => changeStatus(selectedOrder.id, "confirmed")}
                          className="h-10 rounded-lg bg-primary text-xs font-semibold text-white transition hover:bg-charcoal"
                        >
                          Xác nhận đơn
                        </button>
                        <button
                          type="button"
                          onClick={() => changeStatus(selectedOrder.id, "cancelled")}
                          className="h-10 rounded-lg border border-danger text-xs font-semibold text-danger transition hover:bg-danger/5"
                        >
                          Huỷ đơn
                        </button>
                      </>
                    )}
                    {selectedOrder.status === "confirmed" && (
                      <button
                        type="button"
                        onClick={() => changeStatus(selectedOrder.id, "preparing")}
                        className="col-span-2 h-10 rounded-lg bg-primary text-xs font-semibold text-white transition hover:bg-charcoal"
                      >
                        Bắt đầu chuẩn bị món
                      </button>
                    )}
                    {selectedOrder.status === "preparing" && (
                      <button
                        type="button"
                        onClick={() => changeStatus(selectedOrder.id, "shipping")}
                        className="col-span-2 h-10 rounded-lg bg-primary text-xs font-semibold text-white transition hover:bg-charcoal"
                      >
                        Giao cho shipper
                      </button>
                    )}
                    {selectedOrder.status === "shipping" && (
                      <button
                        type="button"
                        onClick={() => changeStatus(selectedOrder.id, "delivered")}
                        className="col-span-2 h-10 rounded-lg bg-primary text-xs font-semibold text-white transition hover:bg-charcoal"
                      >
                        Xác nhận đã giao
                      </button>
                    )}
                    {selectedOrder.status === "delivered" && (
                      <div className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-emerald-50 py-3 text-sm font-semibold text-emerald-700">
                        <CheckCircle2 size={16} /> Đơn hàng hoàn tất
                      </div>
                    )}
                    {selectedOrder.status === "cancelled" && (
                      <div className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-rose-50 py-3 text-sm font-semibold text-rose-700">
                        <XCircle size={16} /> Đơn hàng đã huỷ
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-line bg-white p-6 text-center text-muted">
                Chọn một đơn hàng để xem chi tiết
              </div>
            )}
          </aside>
        </div>
      </div>
    </AdminShell>
  );
}
