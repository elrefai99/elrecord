import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import jwt from "jsonwebtoken";
import ServerError from "../../../utils/api.errors.utils";
import prisma from "../../../core/prisma";
import { UserStatus } from "../../../Common/enum/index.enum";

export const pendingTokenMiddleware = asyncHandler(
     async (req: Request, _res: Response, next: NextFunction) => {
          const authHeader = req.headers.authorization;
          const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies.pending_token;

          if (token) {
               jwt.verify(token, process.env.PENDING_TOKEN_SECRET as string, { algorithms: ['HS256'] },
                    async (err: any, decoded: any) => {
                         if (err) {
                              return next(new ServerError("Invalid token", 401))
                         }
                         const user = await prisma.user.findFirst({
                              where: {
                                   id: decoded.id as number,
                                   status: UserStatus.INACTIVE
                              }
                         })
                         if (!user) {
                              return next(new ServerError("User not found", 404))
                         }
                         req.user = user
                         next()
                    }
               )
          } else {
               return next(new ServerError("Token not found", 401))
          }
     }
)
