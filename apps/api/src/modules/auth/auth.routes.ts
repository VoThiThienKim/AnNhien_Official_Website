import { Router } from "express";
import { z } from "zod";
import { nextId, users } from "../../data/store";
import { asyncHandler, created, ok } from "../../http";
import { validateBody } from "../../middlewares/validate";

const router = Router();

const registerSchema = z.object({
  phone: z.string().min(8),
  email: z.string().email().optional(),
  name: z.string().min(1),
  password: z.string().min(6)
});

const loginSchema = z.object({
  phone: z.string().min(8),
  password: z.string().min(1)
});

router.post(
  "/register",
  validateBody(registerSchema),
  asyncHandler(async (req, res) => {
    const input = req.body as z.infer<typeof registerSchema>;
    const user = {
      id: nextId("user"),
      phone: input.phone,
      email: input.email,
      name: input.name,
      role: "customer" as const,
      createdAt: new Date().toISOString()
    };
    users.push(user);
    return created(res, { user, accessToken: "demo-access-token", refreshToken: "demo-refresh-token" }, "Đăng ký thành công");
  })
);

router.post(
  "/login",
  validateBody(loginSchema),
  asyncHandler(async (req, res) => {
    const input = req.body as z.infer<typeof loginSchema>;
    const user = users.find((item) => item.phone === input.phone) ?? users[0];
    return ok(res, { user, accessToken: "demo-access-token", refreshToken: "demo-refresh-token" }, "Đăng nhập thành công");
  })
);

router.post("/refresh", asyncHandler(async (_req, res) => ok(res, { accessToken: "demo-access-token" }, "Đã làm mới phiên")));
router.post("/forgot-password", asyncHandler(async (_req, res) => ok(res, null, "Đã gửi hướng dẫn đặt lại mật khẩu nếu tài khoản tồn tại")));

export default router;

