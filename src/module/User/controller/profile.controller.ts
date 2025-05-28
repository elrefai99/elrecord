import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { redisFunctions } from "../../../Script/redis/redis.script";

export const profileController = asyncHandler(
     async (req: Request | any, res: Response, _next: NextFunction) => {
          const classs = new redisFunctions()

          const cacheKey = req.user._id
          await classs.setData(cacheKey, req.user)
          res.status(200).json({ code: 200, status: "OK", data: req.user })
     }
)
