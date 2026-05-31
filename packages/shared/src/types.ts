import type {
  BOOKING_STATUSES,
  LOYALTY_TIERS,
  ORDER_STATUSES,
  PAYMENT_METHODS,
  PAYMENT_STATUSES,
  STOCK_STATUSES,
  USER_ROLES,
  VOUCHER_TYPES
} from "./constants";

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      message: string;
    }
  | {
      success: false;
      message: string;
      issues?: unknown;
    };

export type UserRole = (typeof USER_ROLES)[number];
export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export type StockStatus = (typeof STOCK_STATUSES)[number];
export type VoucherType = (typeof VOUCHER_TYPES)[number];
export type LoyaltyTier = (typeof LOYALTY_TIERS)[number];
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export interface User {
  id: string;
  phone: string;
  email?: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  isActive: boolean;
  stockStatus: StockStatus;
  isFlashSale?: boolean;
  tags?: string[];
}

export interface CartItem {
  itemId: string;
  quantity: number;
  note?: string;
}

export interface CartLine extends CartItem {
  menuItem: MenuItem;
  lineTotal: number;
  isAvailable: boolean;
}

export interface CartSummary {
  id: string;
  lines: CartLine[];
  subtotal: number;
  unavailableItemIds: string[];
}

export interface ShippingOption {
  provider: "shop" | "ahamove" | "grabexpress";
  label: string;
  distanceKm: number;
  baseFee: number;
  bufferFee: number;
  totalFee: number;
  etaMinutes: number;
}

export interface Voucher {
  id: string;
  code: string;
  name: string;
  type: VoucherType;
  value: number;
  maxDiscount?: number;
  minOrder: number;
  startAt: string;
  endAt: string;
  totalQty: number;
  usedQty: number;
  isActive: boolean;
}

export interface VoucherValidation {
  code: string;
  isValid: boolean;
  discount: number;
  message: string;
  voucher?: Voucher;
}

export interface OrderItem {
  itemId: string;
  quantity: number;
  unitPrice: number;
  note?: string;
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  address: string;
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  seats: number;
  tableId?: string;
  depositAmount: number;
  status: BookingStatus;
  createdAt: string;
}

export interface LoyaltyAccount {
  userId: string;
  points: number;
  tier: LoyaltyTier;
}

export interface DashboardSummary {
  todayRevenue: number;
  pendingOrders: number;
  preparingOrders: number;
  todayBookings: number;
  topItems: Array<{ itemId: string; name: string; quantity: number }>;
}

