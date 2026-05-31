import { Router } from "express";
import { z } from "zod";
import { asyncHandler, created, ok, requiredParam } from "../../http";
import { requireRole } from "../../middlewares/auth";
import { validateBody } from "../../middlewares/validate";
import { createMenuItem, listCategories, listMenuItems, updateStock } from "./menu.service";

const router = Router();

const createMenuItemSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().positive(),
  images: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  stockStatus: z.enum(["in_stock", "out_of_stock"]).default("in_stock"),
  isFlashSale: z.boolean().optional(),
  tags: z.array(z.string()).optional()
});

const stockSchema = z.object({
  stockStatus: z.enum(["in_stock", "out_of_stock"])
});

router.get("/categories", asyncHandler(async (_req, res) => ok(res, listCategories())));

router.get(
  "/items",
  asyncHandler(async (req, res) => ok(res, listMenuItems(String(req.query.categoryId ?? "") || undefined)))
);

router.post(
  "/admin/items",
  requireRole(["admin"]),
  validateBody(createMenuItemSchema),
  asyncHandler(async (req, res) => created(res, createMenuItem(req.body), "Đã tạo món mới"))
);

router.patch(
  "/admin/items/:id/stock",
  requireRole(["admin", "staff"]),
  validateBody(stockSchema),
  asyncHandler(async (req, res) => {
    const { stockStatus } = req.body as z.infer<typeof stockSchema>;
    return ok(res, updateStock(requiredParam(req, "id"), stockStatus), "Đã cập nhật trạng thái món");
  })
);

export default router;
