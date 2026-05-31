import { Router } from "express";
import { z } from "zod";
import { vouchers } from "../../data/store";
import { asyncHandler, created, ok } from "../../http";
import { requireRole } from "../../middlewares/auth";
import { validateBody } from "../../middlewares/validate";
import { createVoucher, selectBestVoucher, validateVoucher } from "./voucher.service";

const router = Router();

const validateVoucherSchema = z.object({
  code: z.string().optional(),
  codes: z.array(z.string()).optional(),
  subtotal: z.number().int().nonnegative(),
  shippingFee: z.number().int().nonnegative().default(0)
});

const createVoucherSchema = z.object({
  code: z.string().min(2),
  name: z.string().min(1),
  type: z.enum(["percent", "fixed", "free_shipping"]),
  value: z.number().int().positive(),
  maxDiscount: z.number().int().positive().optional(),
  minOrder: z.number().int().nonnegative(),
  startAt: z.string(),
  endAt: z.string(),
  totalQty: z.number().int().positive(),
  isActive: z.boolean().default(true)
});

router.post(
  "/validate",
  validateBody(validateVoucherSchema),
  asyncHandler(async (req, res) => {
    const { code, codes, subtotal, shippingFee } = req.body as z.infer<typeof validateVoucherSchema>;
    const result = codes?.length ? selectBestVoucher(codes, subtotal, shippingFee) : validateVoucher(code ?? "", subtotal, shippingFee);
    return ok(res, result, result?.message ?? "Không có mã phù hợp");
  })
);

router.get("/admin", requireRole(["admin"]), asyncHandler(async (_req, res) => ok(res, vouchers)));

router.post(
  "/admin",
  requireRole(["admin"]),
  validateBody(createVoucherSchema),
  asyncHandler(async (req, res) => created(res, createVoucher(req.body), "Đã tạo mã ưu đãi"))
);

export default router;

