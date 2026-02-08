import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";

export const logoutController = asyncHandler(
     async (_req: Request, res: Response, _next: NextFunction) => {
          res.clearCookie("access_token")
          res.clearCookie("refresh_token")
          res.clearCookie("pending_token")
          res.status(200).json({ success: true, message: "Logout successfully", })
     }
)
