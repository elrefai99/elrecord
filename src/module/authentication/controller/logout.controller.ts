import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";

export const logoutController = asyncHandler(
     async (_req: Request, res: Response, _next: NextFunction) => {
          res.clearCookie("refresh_token", { httpOnly: true, secure: true, sameSite: "none", });
          res.clearCookie("access_token", { httpOnly: true, secure: true, sameSite: "none", });
          res.status(200).json({ code: 200, status: 'OK', message: "Cookie is deleted" });
     }
)
