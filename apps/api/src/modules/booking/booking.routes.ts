import { Router } from "express";
import { z } from "zod";
import { asyncHandler, created, ok, requiredParam } from "../../http";
import { validateBody } from "../../middlewares/validate";
import { confirmBooking, createBooking, getAvailability } from "./booking.service";

const router = Router();

const createBookingSchema = z.object({
  userId: z.string().optional(),
  customerName: z.string().min(1),
  customerPhone: z.string().min(8),
  date: z.string().min(8),
  time: z.string().min(4),
  seats: z.number().int().positive(),
  tableId: z.string().optional(),
  estimatedSpend: z.number().int().positive().optional()
});

router.post(
  "/",
  validateBody(createBookingSchema),
  asyncHandler(async (req, res) => created(res, createBooking(req.body), "Đã tạo lịch đặt bàn"))
);

router.get(
  "/availability",
  asyncHandler(async (req, res) => {
    const date = String(req.query.date ?? "");
    const time = String(req.query.time ?? "");
    return ok(res, getAvailability(date, time), "Đã kiểm tra bàn trống");
  })
);

router.patch(
  "/:id/confirm",
  asyncHandler(async (req, res) => ok(res, confirmBooking(requiredParam(req, "id")), "Đã xác nhận giữ chỗ"))
);

export default router;
