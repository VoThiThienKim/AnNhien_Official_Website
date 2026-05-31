import { Router } from "express";
import { orders, users } from "../../data/store";
import { asyncHandler, ok } from "../../http";

const router = Router();

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const user = users.find((item) => item.id === req.params.userId);
    const userOrders = orders.filter((order) => order.userId === req.params.userId);
    const classification = !userOrders.length ? "potential" : "loyal";

    return ok(res, { user, classification, orders: userOrders }, "Đã tải thông tin khách hàng");
  })
);

export default router;

