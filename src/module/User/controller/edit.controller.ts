import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { redisFunctions } from "../../../Script/redis/redis.script";
import { UserModel } from "../../../schema/User/user.schema";

export const editController = asyncHandler(
     async (req: Request | any, res: Response, _next: NextFunction) => {
          const data = req.body
          const cacheFunc = new redisFunctions()

          await UserModel.findByIdAndUpdate(req.user.id, {
               $set: {
                    ...data
               }
          }, {
               new: true
          })
          const user = await UserModel.findOne({ _id: req.user.id, status: "active" }, { password: 0, notifications: 0, __v: 0, googleId: 0 });
          await cacheFunc.deleteData(req.user.id)
          await cacheFunc.setData(req.user.id, user)
          res.status(200).json({ code: 200, status: "OK", message: "Success update data" })
     }
)
