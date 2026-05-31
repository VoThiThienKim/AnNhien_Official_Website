import { Router } from "express";
import { z } from "zod";
import { asyncHandler, ok } from "../../http";
import { validateBody } from "../../middlewares/validate";
import { applyPaymentWebhook } from "./payment.service";

const router = Router();

const paymentWebhookSchema = z.object({
  orderId: z.string(),
  paymentStatus: z.enum(["unpaid", "pending", "paid", "failed", "refunded"])
});

router.post(
  "/webhooks/:provider",
  validateBody(paymentWebhookSchema),
  asyncHandler(async (req, res) => {
    const { orderId, paymentStatus } = req.body as z.infer<typeof paymentWebhookSchema>;
    return ok(res, applyPaymentWebhook(orderId, paymentStatus), `Đã nhận webhook ${req.params.provider}`);
  })
);

export default router;

