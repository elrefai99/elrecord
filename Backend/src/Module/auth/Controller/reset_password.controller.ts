import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import ServerError from "../../../utils/api.errors.utils";
import bcrypt from "bcryptjs";
import { V4 } from "paseto";
import { createPublicKey } from "crypto";
import prisma from "../../../core/prisma";
import { UserStatus } from "../../../Common/enum/index.enum";

export const resetPasswordController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const authHeader = req.headers.authorization;
          const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies.forget_password_token;
          if (!token) {
               next(new ServerError("Token not found", 404))
               return
          }
          const publicKey = createPublicKey(process.env.PUBLIC_FORGET_PASSWORD_SECRET_KY as string)
          await V4.verify(token, publicKey).then(async (payload: any) => {
               const user = await prisma.user.findFirst({
                    where: {
                         id: payload.data.user_id,
                         status: UserStatus.ACTIVE
                    }
               })
               if (!user) {
                    next(new ServerError("User not found", 404))
                    return
               }
               const salt = await bcrypt.genSalt(10)
               const hashPassword = await bcrypt.hash(req.body.password, salt)
               await prisma.user.update({
                    where: {
                         id: user.id
                    },
                    data: {
                         password: hashPassword,
                         updatePasswordAt: new Date()
                    }
               })
               res.clearCookie("forget_password_token")
               res.status(200).json({ code: 200, status: "OK", message: "Password reset successfully" })
               return
          }).catch((err) => {
               next(new ServerError(`Invalid token: ${err}`, 401))
               return
          })
     }
)
