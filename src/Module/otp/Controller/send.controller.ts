import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { OTP_Service } from "../otp.service";
import { addOTPJobToQueue } from "../../../Queue/OTP/queue.otp";

export const sendOTPController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const otpService = new OTP_Service()

          const check_old_otp = await otpService.check_otp({ user_id: req.user.id })

          if (check_old_otp) {
               await otpService.delete_otp({ id: Number(check_old_otp.id) })
          }

          await addOTPJobToQueue("otp", { userId: req.user.id, email: req.user.email })
          res.status(200).json({ code: 200, status: "OK", message: "OTP sent successfully" });
     }
)
