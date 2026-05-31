import {
  BUSINESS_RULES,
  calculateLoyaltyPoints,
  isWithinOperatingHours,
  minutesBetween,
  resolveLoyaltyTier,
  type Order,
  type OrderStatus,
  type PaymentMethod,
  VI_MESSAGES
} from "@an-nhien/shared";
import { carts, loyaltyAccounts, nextId, orders } from "../../data/store";
import { HttpError } from "../../http";
import { emitRealtime } from "../../realtime";
import { assertCartCheckoutReady } from "../cart/cart.service";
import { estimateShipping } from "../shipping/shipping.service";
import { validateVoucher } from "../voucher/voucher.service";

export interface CreateOrderInput {
  cartId: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  address: string;
  distanceKm: number;
  paymentMethod: PaymentMethod;
  voucherCode?: string;
  now?: Date;
}

export function createOrder(input: CreateOrderInput) {
  const now = input.now ?? new Date();

  if (!isWithinOperatingHours(now)) {
    throw new HttpError(400, VI_MESSAGES.outsideOperatingHours);
  }

  const cart = assertCartCheckoutReady(input.cartId);
  const shipping = estimateShipping(input.distanceKm, cart.subtotal);
  const voucher = input.voucherCode
    ? validateVoucher(input.voucherCode, cart.subtotal, shipping.totalFee)
    : null;
  const discount = voucher?.isValid ? voucher.discount : 0;
  const total = Math.max(0, cart.subtotal + shipping.totalFee - discount);

  const order: Order = {
    id: nextId("order"),
    userId: input.userId,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    address: input.address,
    status: "pending",
    subtotal: cart.subtotal,
    shippingFee: shipping.totalFee,
    discount,
    total,
    paymentMethod: input.paymentMethod,
    paymentStatus: input.paymentMethod === "cod" ? "unpaid" : "pending",
    items: cart.lines.map((line) => ({
      itemId: line.itemId,
      quantity: line.quantity,
      unitPrice: line.menuItem.price,
      note: line.note
    })),
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  };

  orders.unshift(order);
  carts.delete(input.cartId);
  emitRealtime("new_order", { orderId: order.id, order });

  return order;
}

export function getOrder(orderId: string) {
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    throw new HttpError(404, VI_MESSAGES.notFound);
  }

  return order;
}

export function listOrders(userId?: string) {
  return orders.filter((order) => !userId || order.userId === userId);
}

export function cancelOrder(orderId: string, now = new Date()) {
  const order = getOrder(orderId);

  if (order.status !== "pending") {
    throw new HttpError(403, VI_MESSAGES.invalidCancelStatus);
  }

  if (minutesBetween(new Date(order.createdAt), now) > BUSINESS_RULES.cancelWindowMinutes) {
    throw new HttpError(403, VI_MESSAGES.cancelWindowExpired);
  }

  order.status = "cancelled";
  order.updatedAt = now.toISOString();
  emitRealtime("order_cancelled", { orderId });

  return order;
}

export function updateOrderStatus(orderId: string, status: OrderStatus, now = new Date()) {
  const order = getOrder(orderId);
  order.status = status;
  order.updatedAt = now.toISOString();

  if (status === "complete" && order.userId) {
    const current = loyaltyAccounts.get(order.userId) ?? {
      userId: order.userId,
      points: 0,
      tier: "silver" as const
    };
    current.points += calculateLoyaltyPoints(order.total);
    current.tier = resolveLoyaltyTier(current.points);
    loyaltyAccounts.set(order.userId, current);
  }

  emitRealtime("order_status_updated", { orderId, status });
  return order;
}

export function confirmOrder(orderId: string) {
  const order = updateOrderStatus(orderId, "confirmed");

  emitRealtime("order_confirmed", { orderId });
  emitRealtime("print_job", {
    orderId,
    copies: [
      { type: "kitchen", label: "Bếp" },
      { type: "delivery_label", label: "Tem giao hàng" }
    ]
  });

  return order;
}

