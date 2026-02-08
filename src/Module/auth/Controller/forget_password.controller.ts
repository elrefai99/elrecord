import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import { auth_service } from "../auth.service";
import ServerError from "../../../utils/api.errors.utils";
import { token_PASETO } from "../shared/paseto";
import { addEmailsJobToQueue } from "../../../Queue/Emails/queue.emails";

export const forgetPasswordController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { email } = req.body
          const authService: auth_service = new auth_service()
          const checkUser = await authService.find_user_by_email(email)

          if (!checkUser) {
               next(new ServerError("User not found", 404))
               return
          }

          const token = await token_PASETO({ data: { user_id: checkUser.id }, role: checkUser.role, access_device: req.headers["user-agent"] as string }, "forget_password")
          await addEmailsJobToQueue("forgetPassword", {
               data: {
                    userId: checkUser.id,
                    email: checkUser.email,
                    type: "forgetPassword",
                    subject: "Forget Password",
                    link: `${process.env.SITE_URL_LOCALHOST}/reset-password?token=${token}`
               }
          })

          res.cookie("forget_password_token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 1 });
          res.status(200).json({ code: 200, status: "OK", message: "Check your email to reset your password" })
     }
)
