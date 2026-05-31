import type { PaymentStatus } from "@an-nhien/shared";
import { getOrder } from "../order/order.service";

export function applyPaymentWebhook(orderId: string, paymentStatus: PaymentStatus) {
  const order = getOrder(orderId);
  order.paymentStatus = paymentStatus;
  order.updatedAt = new Date().toISOString();
  return order;
}

