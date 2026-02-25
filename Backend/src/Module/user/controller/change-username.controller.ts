import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response, RequestHandler } from "express";
import { change_username_dto } from "../Pipe/edit.dto";
import prisma from "../../../core/prisma";
import ServerError from "../../../utils/api.errors.utils";
import { UserStatus } from "../../../Common/enum/index.enum";
import { user_service } from "../user.service";

export const changeUsernameController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { username } = req.body as change_username_dto

          const cUser = await prisma.user.findFirst({
               where: {
                    status: UserStatus.ACTIVE,
                    username: username.toLowerCase()
               }
          })

          if (cUser) {
               return next(new ServerError("Username already exists", 400))
          }
          const userService = new user_service()
          const result = await userService.change_username_service({ user_id: req.user.id, username })
          if (!result.success) {
               return next(new ServerError(result.message, 500))
          }

          return res.status(200).json({ code: 200, status: "OK", success: true, error: false, timestamp: new Date(), message: "Username changed successfully", data: null });
     }
)
