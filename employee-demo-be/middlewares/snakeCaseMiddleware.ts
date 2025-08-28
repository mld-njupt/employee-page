// middlewares/snakeCaseMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { toSnakeCase } from "../utils/caseConverter";

export function snakeCaseRequestMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === "object") {
    req.body = toSnakeCase(req.body);
  }
  if (req.query && typeof req.query === "object") {
    Object.assign(req.query, toSnakeCase(req.query));
  }
  next();
}