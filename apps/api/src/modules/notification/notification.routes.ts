import { Router } from "express";
import { asyncHandler, ok } from "../../http";
import { emitRealtime } from "../../realtime";

const router = Router();

router.post(
  "/test-staff-alert",
  asyncHandler(async (_req, res) => {
    emitRealtime("new_order", { demo: true });
    return ok(res, { emitted: true }, "Đã gửi thông báo thử");
  })
);

export default router;

