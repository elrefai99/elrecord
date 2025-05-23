import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import ServerError from "../../../utils/api.errors.utils";
import jsonwebtoken from 'jsonwebtoken'
import { UserModel } from "../../../schema/User/user.schema";
import { accountToken } from "../../../utils/Guards/JWT/access.token";

export const refreshController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) =>{
    const cookie = req.cookies

    if(!cookie.refresh_token){
      next(new ServerError("Access token of user alreadt not expire yet", 401))
      return
    }

    const refreshSecretKey = process.env.REFRESH_TOKEN_SECRET as string
    jsonwebtoken.verify(cookie.refresh_token, refreshSecretKey,  async (err: any, decoded: any): Promise<any> => {
                     if (err) {
                    next(new ServerError("Refrsh token is not valid, please sign in again", 401));
                    return
               }

               const foundUser = await UserModel.findOne({ _id: decoded._id, status: "active" }, {
                    _id: 1,
               });

               if (!foundUser) {
                    next(new ServerError("User not founded", 404));
                    return
               }
               const token = accountToken(foundUser?._id, foundUser?.tokenVersion);
               res.cookie("__srmt", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 30 }); // access token with 30 minutes expiration
          res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 1, });
               res.status(200).json({ code: 200, status: "OK", message: "Success create new access token" });
    })
  }
)
