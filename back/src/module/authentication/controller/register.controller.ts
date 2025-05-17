import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import bcrypt, { genSalt } from 'bcryptjs'
import ServerError from "../../../utils/api.errors.utils";
import { UserModel } from "../../../schema/User/user.schema";
import { PendingToken } from "../../../utils/Guards/JWT/access.token";

export const registerController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const { fullname, email, password, code, phone } = req.body

          const cUser = await UserModel.findOne({ email: email.toLowerCase(), status: "active" }, {
               _id: 1,
               phone: 1,
               email: 1,
          })

          if (cUser) {
               if (cUser?.email.toLowerCase() === email.toLowerCase()) {
                    res.status(400).json({ code: 400, status: "Bad Request", message: "Email already exists" })
                    next(new ServerError("Email already exists", 400))
                    return
               }
          }

          const salt = await genSalt(10)
          const hashedPassword = await bcrypt.hash(password, salt)

          const username = `${fullname.toLowerCase()}${Math.floor(Math.random() * 1000)}`

          const user = new UserModel({
               fullname,
               email: email.toLowerCase(),
               password: hashedPassword,
               code,
               phone,
               username,
               status: "pending"
          })

          const token = PendingToken(user._id, user.tokenVersion);
          res.cookie("__aadv", token, { httpOnly: true, secure: true, sameSite: "none", maxAge: 1000 * 60 * 60 * 24 * 1, });
          await user.save();
          // res.cookie()

          res.status(201).json({ code: 201, status: "Created", message: "User created successfully", token })
     }
)
