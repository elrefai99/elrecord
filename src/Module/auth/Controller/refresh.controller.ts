import { asyncHandler } from "../../../utils/asyncHandler.utils"
import { NextFunction, Request, Response } from "express"
import ServerError from "../../../utils/api.errors.utils"
import { createPublicKey } from "node:crypto"
import { V4 } from "paseto"
import prisma from "../../../core/prisma"
import { token_PASETO } from "../shared/paseto"

export const refreshController = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const token: undefined = req.cookies.refresh_token

          if (!token) {
               next(new ServerError("Refresh token not found", 401))
               return
          }
          const publicKey = createPublicKey(process.env.PUBLIC_REFRESH_TOKEN_SECRET as string)
          await V4.verify(token, publicKey).then(async (payload: any) => {
               const user = await prisma.user.findUnique({
                    where: {
                         id: payload.data.user_id
                    }
               })
               if (!user) {
                    next(new ServerError("User not found", 404))
                    return
               }
               const token = await token_PASETO(payload, "access")
               res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 })
               res.status(200).json({ code: 200, status: "OK", timestamp: new Date().toISOString(), success: true, error: false, message: "Refresh token successful", token })
               return
          }).catch((err) => {
               next(new ServerError(`Invalid refresh token: ${err}`, 401))
               return
          })
     }
)
