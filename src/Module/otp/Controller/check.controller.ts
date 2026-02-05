import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import ServerError from "../../../utils/api.errors.utils";
import { OTP_Service } from "../otp.service";
import prisma from "../../../core/prisma";
import { UserStatus } from "../../../Common/enum/index.enum";

export const checkOTPController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { code } = req.body
          const otpService = new OTP_Service()

          const check_otp = await otpService.check_otp({ user_id: req.user.id })

          if (!check_otp) {
               return next(new ServerError("OTP not found", 404))
          }

          if (check_otp.code !== code) {
               return next(new ServerError("Invalid OTP", 401))
          }

          if (check_otp.expiresAt && check_otp.expiresAt < new Date()) {
               return next(new ServerError("OTP expired", 401))
          }

          await otpService.delete_otp({ id: Number(check_otp.id) })
          await prisma.user.update({
               where: {
                    id: req.user.id
               },
               data: {
                    status: UserStatus.ACTIVE
               }
          })

          res.status(200).json({ code: 200, status: "OK", message: "OTP verified successfully" });
     }
)
