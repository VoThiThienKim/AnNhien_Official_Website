import { Router } from "express";
import { loyaltyAccounts } from "../../data/store";
import { asyncHandler, ok, requiredParam } from "../../http";

const router = Router();

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = requiredParam(req, "userId");
    const account = loyaltyAccounts.get(userId) ?? {
      userId,
      points: 0,
      tier: "silver" as const
    };
    return ok(res, account, "Đã tải điểm thành viên");
  })
);

router.get(
  "/:userId/history",
  asyncHandler(async (req, res) => ok(res, [], "Lịch sử điểm sẽ được đồng bộ ở bản database"))
);

export default router;
