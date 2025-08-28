import { Request, Response, NextFunction } from "express";
import { toCamelCase } from "../utils/caseConverter";
export function camelCaseResponseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const oldJson = res.json.bind(res); // 绑定 this
  res.json = ((data: any) => {
    return oldJson(toCamelCase(data));
  }) as Response["json"];
  next();
}
