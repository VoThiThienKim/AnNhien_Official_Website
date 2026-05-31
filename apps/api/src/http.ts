import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { VI_MESSAGES } from "@an-nhien/shared";

export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly issues?: unknown
  ) {
    super(message);
  }
}

export function ok<T>(res: Response, data: T, message = "Thành công") {
  return res.json({ success: true, data, message });
}

export function created<T>(res: Response, data: T, message = "Tạo mới thành công") {
  return res.status(201).json({ success: true, data, message });
}

export function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

export function requiredParam(req: Request, name: string) {
  const value = req.params[name];

  if (typeof value !== "string" || value.length === 0) {
    throw new HttpError(400, VI_MESSAGES.validationFailed, { param: name });
  }

  return value;
}

export function errorHandler(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: VI_MESSAGES.validationFailed,
      issues: error.flatten()
    });
  }

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      issues: error.issues
    });
  }

  const message = error instanceof Error ? error.message : "Có lỗi xảy ra";
  return res.status(500).json({ success: false, message });
}
