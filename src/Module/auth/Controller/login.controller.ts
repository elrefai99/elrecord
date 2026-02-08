import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import { login_dto } from "../DTO/index.dto";
import { auth_service } from "../auth.service";
import ServerError from "../../../utils/api.errors.utils";
import bcrypt from 'bcryptjs'
import { token_PASETO } from "../shared/paseto";

export const loginController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { email, password } = req.body as login_dto

          const authService: auth_service = new auth_service()

          const user = await authService.find_user_by_email(email)

          if (!user) {
               next(new ServerError("User not found", 404))
               return
          }

          const isPassword_matched = await bcrypt.compare(password, user.password)

          if (!isPassword_matched) {
               next(new ServerError("Invalid credentials", 401))
               return
          }

          const token = await token_PASETO({ data: { user_id: user._id } }, "access")
          const refreshToken = await token_PASETO({ data: { user_id: user._id } }, "refresh")

          res.cookie("refresh_token", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7 });
          res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 1 });

          res.status(200).json({ code: 200, status: "OK", message: "Login successful", token })

     }
)
