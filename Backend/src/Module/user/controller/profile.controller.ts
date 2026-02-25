import { NextFunction, Request, Response, RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { cache_service } from "../../../Common/functions/Redis/cache.service.fun";

export const profileController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const user = req.user
          const redis: cache_service = new cache_service()
          await redis.setData(`user:${user.id}`, user)
          res.status(200).json({ code: 200, status: "Success", timestamp: new Date(), message: "User found", data: user })
          return
     }
)
