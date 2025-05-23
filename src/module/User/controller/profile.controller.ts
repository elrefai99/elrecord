import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";

export const profileController = asyncHandler(
     async (req: Request | any, res: Response, _next: NextFunction) => {
          const user = req.user.toObject()

          res.status(200).json({ code: 200, status: "OK", data: user })
     }
)
