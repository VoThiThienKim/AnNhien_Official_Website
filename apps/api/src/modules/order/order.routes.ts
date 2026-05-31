import { Router } from "express";
import { z } from "zod";
import { asyncHandler, created, ok, requiredParam } from "../../http";
import { requireRole } from "../../middlewares/auth";
import { validateBody } from "../../middlewares/validate";
import { cancelOrder, confirmOrder, createOrder, getOrder, listOrders, updateOrderStatus } from "./order.service";

const router = Router();

const createOrderSchema = z.object({
  cartId: z.string(),
  userId: z.string().optional(),
  customerName: z.string().min(1),
  customerPhone: z.string().min(8),
  address: z.string().min(3),
  distanceKm: z.number().positive().max(10),
  paymentMethod: z.enum(["cod", "momo", "vnpay"]),
  voucherCode: z.string().optional()
});

const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "preparing", "ready", "shipping", "delivered", "complete", "cancelled"])
});

router.post(
  "/",
  validateBody(createOrderSchema),
  asyncHandler(async (req, res) => created(res, createOrder(req.body), "Đã tạo đơn hàng"))
);

router.get(
  "/user/:userId",
  asyncHandler(async (req, res) => ok(res, listOrders(requiredParam(req, "userId")), "Đã tải lịch sử đơn hàng"))
);

router.get("/:id", asyncHandler(async (req, res) => ok(res, getOrder(requiredParam(req, "id")), "Đã tải đơn hàng")));

router.patch(
  "/:id/cancel",
  asyncHandler(async (req, res) => ok(res, cancelOrder(requiredParam(req, "id")), "Đã hủy đơn hàng"))
);

router.patch(
  "/admin/:id/status",
  requireRole(["admin", "staff"]),
  validateBody(updateOrderStatusSchema),
  asyncHandler(async (req, res) => {
    const { status } = req.body as z.infer<typeof updateOrderStatusSchema>;
    return ok(res, updateOrderStatus(requiredParam(req, "id"), status), "Đã cập nhật trạng thái đơn");
  })
);

router.patch(
  "/admin/:id/confirm",
  requireRole(["admin", "staff"]),
  asyncHandler(async (req, res) => ok(res, confirmOrder(requiredParam(req, "id")), "Đã xác nhận đơn"))
);

export default router;
