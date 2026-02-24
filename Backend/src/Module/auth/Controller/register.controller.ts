import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { register_dto } from "../DTO/index.dto";
import { auth_service } from "../auth.service";
import ServerError from "../../../utils/api.errors.utils";
import { addOTPJobToQueue } from "../../../Queue/OTP/queue.otp";
import { token_PASETO } from "../utils/paseto";

export const registerController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const data = req.body as register_dto
          const authService = new auth_service()

          const user = await authService.find_user_by_email(data.email)
          if (user) {
               next(new ServerError("User already exists", 400))
               return
          }
          const newUser = await authService.create_user(data)

          const token = await token_PASETO({ data: { user_id: newUser.id } }, "pending")
          await addOTPJobToQueue("otp", { userId: newUser.id, email: newUser.email })
          res.cookie("pending_token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 2, })
          return res.status(201).json({ code: 201, status: "Created", message: "User created successfully" });
     }
)
