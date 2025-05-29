import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { UserModel } from "../../../schema/User/user.schema";
import { redisFunctions } from "../../../Script/redis/redis.script";
const cacheFunc = new redisFunctions()

export const deleteController = asyncHandler(
     async (req: Request | any, res: Response, _next: NextFunction) => {
          await UserModel.findByIdAndUpdate(req.user.id, {
               $set: {
                    status: "deleted"
               }
          }, {
               new: true
          })

          await cacheFunc.deleteData(req.user.id)
          res.status(200).json({ code: 200, status: "OK", message: "Success delete user data" })
     }
)
