import { Router } from "express";
import { z } from "zod";
import { asyncHandler, ok, requiredParam } from "../../http";
import { validateBody } from "../../middlewares/validate";
import { addCartItem, getCart, updateCartItem } from "./cart.service";

const router = Router();

const addCartItemSchema = z.object({
  itemId: z.string(),
  quantity: z.number().int().positive(),
  note: z.string().optional()
});

const updateCartItemSchema = z.object({
  quantity: z.number().int().min(0)
});

router.get(
  "/:cartId",
  asyncHandler(async (req, res) => ok(res, getCart(requiredParam(req, "cartId")), "Đã tải giỏ hàng"))
);

router.post(
  "/:cartId/items",
  validateBody(addCartItemSchema),
  asyncHandler(async (req, res) => {
    const { itemId, quantity, note } = req.body as z.infer<typeof addCartItemSchema>;
    return ok(res, addCartItem(requiredParam(req, "cartId"), itemId, quantity, note), "Đã thêm món vào giỏ");
  })
);

router.patch(
  "/:cartId/items/:itemId",
  validateBody(updateCartItemSchema),
  asyncHandler(async (req, res) => {
    const { quantity } = req.body as z.infer<typeof updateCartItemSchema>;
    return ok(
      res,
      updateCartItem(requiredParam(req, "cartId"), requiredParam(req, "itemId"), quantity),
      "Đã cập nhật giỏ hàng"
    );
  })
);

export default router;
