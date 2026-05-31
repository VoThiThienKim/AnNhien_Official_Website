import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { errorHandler, ok } from "./http";
import adminRoutes from "./modules/admin/admin.routes";
import authRoutes from "./modules/auth/auth.routes";
import bookingRoutes from "./modules/booking/booking.routes";
import cartRoutes from "./modules/cart/cart.routes";
import customerRoutes from "./modules/customer/customer.routes";
import loyaltyRoutes from "./modules/loyalty/loyalty.routes";
import menuRoutes from "./modules/menu/menu.routes";
import notificationRoutes from "./modules/notification/notification.routes";
import orderRoutes from "./modules/order/order.routes";
import paymentRoutes from "./modules/payment/payment.routes";
import reportRoutes from "./modules/report/report.routes";
import shippingRoutes from "./modules/shipping/shipping.routes";
import voucherRoutes from "./modules/voucher/voucher.routes";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
      credentials: true
    })
  );
  app.use(express.json());
  app.use(rateLimit({ windowMs: 60_000, limit: 300 }));

  app.get("/health", (_req, res) => ok(res, { status: "ok" }, "API sẵn sàng"));
  app.use("/api/auth", authRoutes);
  app.use("/api/menu", menuRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/bookings", bookingRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/shipping", shippingRoutes);
  app.use("/api/vouchers", voucherRoutes);
  app.use("/api/loyalty", loyaltyRoutes);
  app.use("/api/customers", customerRoutes);
  app.use("/api/notifications", notificationRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/reports", reportRoutes);
  app.use(errorHandler);

  return app;
}

