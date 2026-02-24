import prisma from "../../core/prisma";
import { OTPStatus } from "../../generated/prisma";
import { OTP_Check, OTP_Delete } from "./@types";

export class OTP_Service {
     public async check_otp(payload: OTP_Check) {
          const check_otp = await prisma.oTP.findFirst({
               where: {
                    user_id: payload.user_id,
                    status: OTPStatus.PENDING,
                    expiresAt: {
                         gte: new Date(),
                    },
               },
          });

          return check_otp
     }

     public async delete_otp(payload: OTP_Delete) {
          const delete_otp = await prisma.oTP.update({
               where: {
                    id: payload.id,
               },
               data: {
                    status: OTPStatus.EXPIRED,
               },
          });

          return delete_otp
     }
}
