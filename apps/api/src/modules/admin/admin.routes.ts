import { Router } from "express";
import { orders, bookings, menuItems } from "../../data/store";
import { asyncHandler, ok } from "../../http";
import { requireRole } from "../../middlewares/auth";

const router = Router();

router.get(
  "/dashboard",
  requireRole(["admin", "staff"]),
  asyncHandler(async (_req, res) => {
    const topItems = menuItems.slice(0, 3).map((item) => ({
      itemId: item.id,
      name: item.name,
      quantity: orders.reduce((total, order) => {
        const line = order.items.find((orderItem) => orderItem.itemId === item.id);
        return total + (line?.quantity ?? 0);
      }, 0)
    }));

    return ok(
      res,
      {
        todayRevenue: orders.filter((order) => order.status === "complete").reduce((total, order) => total + order.total, 0),
        pendingOrders: orders.filter((order) => order.status === "pending").length,
        preparingOrders: orders.filter((order) => order.status === "preparing").length,
        todayBookings: bookings.length,
        topItems
      },
      "Đã tải dashboard"
    );
  })
);

export default router;

