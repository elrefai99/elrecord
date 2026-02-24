import { asyncHandler } from "../../../utils/asyncHandler.utils"
import { NextFunction, Request, Response, RequestHandler } from "express"
import ServerError from "../../../utils/api.errors.utils"
import { createPublicKey } from "node:crypto"
import { V4 } from "paseto"
import prisma from "../../../core/prisma"
import { token_PASETO } from "../guards/paseto.guard"

export const refreshController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const token: undefined = req.cookies.refresh_token

          if (!token) {
               next(new ServerError("Refresh token not found", 401))
               return
          }
          const publicKey = createPublicKey(process.env.PUBLIC_REFRESH_TOKEN_SECRET as string)
          await V4.verify(token, publicKey).then(async (payload: any) => {
               const date = new Date().getTime()
               if (date > payload.expireAt) {
                    res.status(401).json({ code: 401, status: "UNAUTHORIZED", success: false, error: true, timestamp: new Date().toISOString(), message: "Refrsh token is expired, please sign in again", data: null });
                    return
               }
               const user = await prisma.user.findUnique({
                    where: {
                         id: payload.data.user_id
                    }
               })
               if (!user) {
                    next(new ServerError("User not found", 404))
                    return
               }

               // calculate remaining time for the refresh token
               const expireDate: Date = new Date(payload.exp)
               const remainingMs: number = expireDate.getTime() - Date.now()
               const remainingDays: number = Math.floor(remainingMs / (1000 * 60 * 60 * 24))

               const token: string = await token_PASETO(payload, "access")
               const tokenRefresh: string = await token_PASETO(payload, "refresh", `${remainingDays}d`)
               res.cookie("access_token", token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: remainingMs })
               res.cookie("refresh_token", tokenRefresh, { httpOnly: true, secure: true, sameSite: "strict", maxAge: remainingMs })
               res.status(200).json({ code: 200, status: "OK", success: true, error: false, timestamp: new Date().toISOString(), message: "Refresh token successful", data: { token } })
               return
          }).catch((err) => {
               next(new ServerError(`Invalid refresh token: ${err}`, 401))
               return
          })
     }
)
