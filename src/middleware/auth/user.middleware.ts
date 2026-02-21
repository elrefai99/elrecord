import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.utils";
import { createPublicKey } from "node:crypto";
import { V4 } from "paseto";
import prisma from "../../core/prisma";

export const userMiddleware = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const authHeader = req.headers.authorization;
          const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies.access_token;

          if (token) {
               const publicKey = createPublicKey(process.env.PUBLIC_ACCESS_TOKEN_SECRET as string)
               await V4.verify(token, publicKey).then(async (payload: any) => {
                    const checkUser = await prisma.user.findUnique({ where: { id: payload.data.user_id }, select: { id: true } })

                    if (!checkUser) {
                         res.status(401).json({ code: 401, status: "Unauthorized", timestamp: new Date(), message: "Invalid token" })
                         return
                    }

                    req.user = checkUser;
                    next();
               }).catch((err: any) => {
                    res.status(401).json({ code: 401, status: "Unauthorized", timestamp: new Date(), message: err.message })
                    return
               })
          }
          else {
               res.status(403).json({ code: 403, status: "Forbidden", timestamp: new Date(), message: "No token provided" })
               return
          }
     }
)
