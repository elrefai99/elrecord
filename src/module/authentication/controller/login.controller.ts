import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import bcrypt from 'bcryptjs'
import ServerError from "../../../utils/api.errors.utils";
import { accountToken } from "../../../utils/Guards/JWT/access.token";
import { refreshToken } from "../../../utils/Guards/JWT/refresh_token";
import { UserModel } from "../../../schema/User/user.schema";

export const loginController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { email, password } = req.body

          const cUser = await UserModel.findOne({ status: "active", email: email }, {
               email: 1,
               password: 1,
               tokenVersion: 1,
               _id: 1
          });

          if (!cUser) {
               next(new ServerError("This Email Not Exist, Please try again.", 400));
               return
          }

          const cPassword = await bcrypt.compare(password, cUser?.password);
          if (!cPassword) {
               next(new ServerError("The password is incorrect. Please try again.", 400));
               return
          }

          const token = accountToken(cUser?._id, cUser?.tokenVersion);
          const refresh = refreshToken(cUser?._id);
          // user.refreshToken = refresh;
          // res.cookie()
          res.cookie("__ssdt", refresh, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7, });
          res.cookie("__srmt", token, { httpOnly: process.env.NODE_ENV === 'development', secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 1 });
          res.cookie("refresh_token", refresh, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 7, });
          res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 1, });

          res.status(200).json({ code: 200, status: "OK", message: "User successfully Login", token })
     }
)
