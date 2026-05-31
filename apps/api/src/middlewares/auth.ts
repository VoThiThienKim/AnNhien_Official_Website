import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../http";

export function requireRole(roles: Array<"staff" | "admin" | "customer">) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const role = (req.header("x-demo-role") ?? "customer") as "staff" | "admin" | "customer";

    if (!roles.includes(role)) {
      throw new HttpError(403, "Bạn không có quyền thực hiện thao tác này.");
    }

    next();
  };
}

