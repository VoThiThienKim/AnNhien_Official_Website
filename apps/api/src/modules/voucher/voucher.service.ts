import { BUSINESS_RULES, VI_MESSAGES, type Voucher, type VoucherValidation } from "@an-nhien/shared";
import { vouchers, nextId } from "../../data/store";
import { HttpError } from "../../http";

export function calculateVoucherDiscount(voucher: Voucher, subtotal: number, shippingFee: number) {
  if (!voucher.isActive || voucher.usedQty >= voucher.totalQty) {
    return 0;
  }

  if (subtotal < Math.max(voucher.minOrder, BUSINESS_RULES.voucherMinimumSubtotal)) {
    return 0;
  }

  if (voucher.type === "fixed") {
    return Math.min(voucher.value, subtotal);
  }

  if (voucher.type === "percent") {
    const rawDiscount = Math.floor((subtotal * voucher.value) / 100);
    return Math.min(rawDiscount, voucher.maxDiscount ?? rawDiscount);
  }

  return Math.min(shippingFee, shippingFee);
}

export function validateVoucher(code: string, subtotal: number, shippingFee: number): VoucherValidation {
  const normalizedCode = code.trim().toUpperCase();
  const voucher = vouchers.find((item) => item.code === normalizedCode);

  if (!voucher) {
    return { code: normalizedCode, isValid: false, discount: 0, message: "Mã ưu đãi không tồn tại." };
  }

  const discount = calculateVoucherDiscount(voucher, subtotal, shippingFee);

  if (discount <= 0) {
    return {
      code: normalizedCode,
      isValid: false,
      discount: 0,
      message: VI_MESSAGES.voucherMinimumNotMet,
      voucher
    };
  }

  return {
    code: normalizedCode,
    isValid: true,
    discount,
    message: "Áp dụng mã thành công.",
    voucher
  };
}

export function selectBestVoucher(codes: string[], subtotal: number, shippingFee: number) {
  const validations = codes.map((code) => validateVoucher(code, subtotal, shippingFee));
  return validations.sort((a, b) => b.discount - a.discount)[0] ?? null;
}

export function createVoucher(input: Omit<Voucher, "id" | "usedQty">) {
  if (vouchers.some((voucher) => voucher.code === input.code.trim().toUpperCase())) {
    throw new HttpError(409, "Mã ưu đãi đã tồn tại.");
  }

  const voucher: Voucher = { ...input, id: nextId("voucher"), code: input.code.trim().toUpperCase(), usedQty: 0 };
  vouchers.push(voucher);
  return voucher;
}

