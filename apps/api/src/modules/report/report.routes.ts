import { Router } from "express";
import { orders } from "../../data/store";
import { asyncHandler, ok } from "../../http";
import { requireRole } from "../../middlewares/auth";

const router = Router();

router.get(
  "/revenue",
  requireRole(["admin"]),
  asyncHandler(async (_req, res) => {
    const completed = orders.filter((order) => order.status === "complete");
    return ok(
      res,
      {
        totalRevenue: completed.reduce((total, order) => total + order.total, 0),
        completedOrders: completed.length,
        averageOrderValue: completed.length
          ? Math.round(completed.reduce((total, order) => total + order.total, 0) / completed.length)
          : 0
      },
      "Đã tải báo cáo doanh thu"
    );
  })
);

export default router;

