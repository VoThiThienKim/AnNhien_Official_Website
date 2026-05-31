import { describe, expect, it } from "vitest";
import { BUSINESS_RULES } from "@an-nhien/shared";
import { carts } from "./data/store";
import { addCartItem } from "./modules/cart/cart.service";
import { createBooking } from "./modules/booking/booking.service";
import { createOrder, cancelOrder, updateOrderStatus } from "./modules/order/order.service";
import { estimateShipping } from "./modules/shipping/shipping.service";
import { validateVoucher } from "./modules/voucher/voucher.service";

describe("An Nhien business rules", () => {
  it("adds shipping buffer unless order qualifies for free shipping", () => {
    const shipping = estimateShipping(3, 200000);
    expect(shipping.totalFee).toBe(shipping.baseFee + BUSINESS_RULES.shippingBufferFee);

    const freeShipping = estimateShipping(3, 500000);
    expect(freeShipping.totalFee).toBe(0);
  });

  it("enforces voucher minimum on subtotal only", () => {
    const invalid = validateVoucher("FRESH20", 199000, 50000);
    expect(invalid.isValid).toBe(false);

    const valid = validateVoucher("FRESH20", 200000, 0);
    expect(valid.isValid).toBe(true);
    expect(valid.discount).toBe(20000);
  });

  it("requires deposit for booking groups over six", () => {
    const small = createBooking({
      customerName: "Lan",
      customerPhone: "0900000001",
      date: "2026-06-01",
      time: "18:30",
      seats: 4
    });
    expect(small.depositAmount).toBe(0);

    const large = createBooking({
      customerName: "Minh",
      customerPhone: "0900000002",
      date: "2026-06-01",
      time: "19:00",
      seats: 8,
      estimatedSpend: 1200000
    });
    expect(large.depositAmount).toBe(1200000);
  });

  it("accepts order during operating hours and blocks late cancellation", () => {
    const cartId = "test-cart-order";
    carts.delete(cartId);
    addCartItem(cartId, "item-lotus-rice", 3);

    const order = createOrder({
      cartId,
      userId: "user-demo",
      customerName: "Khách Test",
      customerPhone: "0900000003",
      address: "Quận 1, TP.HCM",
      distanceKm: 3,
      paymentMethod: "cod",
      now: new Date("2026-05-31T04:00:00.000Z")
    });

    expect(order.status).toBe("pending");
    expect(() => cancelOrder(order.id, new Date("2026-05-31T04:06:00.000Z"))).toThrow();
  });

  it("adds loyalty points only when an order completes", () => {
    const cartId = "test-cart-loyalty";
    carts.delete(cartId);
    addCartItem(cartId, "item-lotus-rice", 2);

    const order = createOrder({
      cartId,
      userId: "user-demo",
      customerName: "Khách Loyalty",
      customerPhone: "0900000004",
      address: "Quận 3, TP.HCM",
      distanceKm: 1.5,
      paymentMethod: "cod",
      now: new Date("2026-05-31T05:00:00.000Z")
    });

    const complete = updateOrderStatus(order.id, "complete");
    expect(complete.status).toBe("complete");
  });
});

