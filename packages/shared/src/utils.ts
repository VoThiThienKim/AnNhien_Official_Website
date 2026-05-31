import { BUSINESS_RULES } from "./constants";
import type { LoyaltyTier } from "./types";

export function formatVnd(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0
  }).format(value);
}

export function calculateLoyaltyPoints(total: number): number {
  return Math.floor(total / BUSINESS_RULES.vndPerLoyaltyPoint);
}

export function resolveLoyaltyTier(points: number): LoyaltyTier {
  if (points >= BUSINESS_RULES.loyaltyDiamondMinPoints) {
    return "diamond";
  }

  if (points >= BUSINESS_RULES.loyaltyGoldMinPoints) {
    return "gold";
  }

  return "silver";
}

export function isWithinOperatingHours(date = new Date()): boolean {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Bangkok",
      hour: "numeric",
      hour12: false
    }).format(date)
  );

  return hour >= BUSINESS_RULES.orderOpenHour && hour < BUSINESS_RULES.orderCloseHour;
}

export function minutesBetween(from: Date, to = new Date()): number {
  return Math.floor((to.getTime() - from.getTime()) / 60_000);
}

