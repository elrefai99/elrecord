import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import ServerError from "../../../utils/api.errors.utils";
import prisma from "../../../core/prisma";
import { UserStatus } from "../../../Common/enum/index.enum";
import { createPublicKey } from "crypto";
import { V4 } from "paseto";

export const pendingTokenMiddleware = asyncHandler(
     async (req: Request, _res: Response, next: NextFunction) => {
          const authHeader = req.headers.authorization;
          const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies.pending_token;

          if (token) {
               const publicKey = createPublicKey(process.env.PUBLIC_PENDING_TOKEN_SECRET as string)
               await V4.verify(token, publicKey).then(async (payload: any) => {
                    const user = await prisma.user.findFirst({
                         where: {
                              id: payload.data.user_id,
                              status: UserStatus.INACTIVE
                         }
                    })
                    if (!user) {
                         return next(new ServerError("User not found or not inactive", 404))
                    }
                    req.user = user
                    next()
                    return
               }).catch((err) => {
                    next(new ServerError(`Invalid token: ${err}`, 401))
                    return
               })
          } else {
               next(new ServerError("Token not found", 401))
               return
          }
     }
)
