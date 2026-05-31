export const BUSINESS_TIMEZONE = "Asia/Bangkok";

export const BUSINESS_RULES = {
  orderOpenHour: 8,
  orderCloseHour: 21,
  cancelWindowMinutes: 5,
  voucherMinimumSubtotal: 200_000,
  shippingBufferFee: 2_000,
  freeShippingSubtotal: 500_000,
  bookingDepositSeatThreshold: 6,
  vndPerLoyaltyPoint: 10_000,
  loyaltyGoldMinPoints: 501,
  loyaltyDiamondMinPoints: 2_001
} as const;

export const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "shipping",
  "delivered",
  "complete",
  "cancelled"
] as const;

export const PAYMENT_STATUSES = ["unpaid", "pending", "paid", "failed", "refunded"] as const;
export const PAYMENT_METHODS = ["cod", "momo", "vnpay"] as const;
export const USER_ROLES = ["customer", "staff", "admin"] as const;
export const STOCK_STATUSES = ["in_stock", "out_of_stock"] as const;
export const VOUCHER_TYPES = ["percent", "fixed", "free_shipping"] as const;
export const LOYALTY_TIERS = ["silver", "gold", "diamond"] as const;
export const BOOKING_STATUSES = ["pending", "confirmed", "cancelled"] as const;

export const VI_MESSAGES = {
  outsideOperatingHours:
    "Cảm ơn quý khách, quán đã nghỉ. Đơn của bạn sẽ được xử lý vào 08:00 sáng mai.",
  cancelWindowExpired: "Đơn hàng đã quá thời gian tự hủy. Vui lòng gọi hotline để được hỗ trợ.",
  invalidCancelStatus: "Chỉ có thể hủy đơn đang chờ xác nhận.",
  outOfStock: "Một hoặc nhiều món trong giỏ hiện đã hết hàng.",
  voucherMinimumNotMet: "Đơn hàng chưa đạt điều kiện tối thiểu để áp dụng mã.",
  bookingDepositRequired: "Nhóm trên 6 người cần thanh toán cọc 100% để giữ chỗ.",
  validationFailed: "Dữ liệu gửi lên chưa hợp lệ.",
  notFound: "Không tìm thấy dữ liệu phù hợp."
} as const;

