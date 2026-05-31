import { Router } from "express";
import { z } from "zod";
import { asyncHandler, ok } from "../../http";
import { validateBody } from "../../middlewares/validate";
import { estimateShipping } from "./shipping.service";

const router = Router();

const estimateShippingSchema = z.object({
  distanceKm: z.number().positive().max(10),
  subtotal: z.number().int().nonnegative()
});

router.post(
  "/estimate",
  validateBody(estimateShippingSchema),
  asyncHandler(async (req, res) => {
    const { distanceKm, subtotal } = req.body as z.infer<typeof estimateShippingSchema>;
    return ok(res, estimateShipping(distanceKm, subtotal), "Đã tính phí giao hàng");
  })
);

export default router;

