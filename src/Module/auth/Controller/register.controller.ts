import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { register_dto } from "../DTO/index.dto";
import { auth_service } from "../auth.service";
import ServerError from "../../../utils/api.errors.utils";
import { pending_token } from "../shared/jwt";

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
          const token = pending_token(newUser.id)

          res.cookie("pending_token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 1000 * 60 * 60 * 24 * 7, })
          return res.status(201).json({ code: 201, status: "Created", message: "User created successfully" });
     }
)
