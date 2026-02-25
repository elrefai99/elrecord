import { NextFunction, Request, Response, RequestHandler } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import prisma from "../../../core/prisma";

export const editController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const user = await prisma.user.findUnique({
               where: {
                    id: req.user.id,
               },
          });

          if (!user) {
               return next(new Error("User not found"));
          }
          const updatedUser = await prisma.user.update({
               where: {
                    id: req.user.id,
               },
               data: req.body,
          });
          res.status(200).json(updatedUser);
     }
)
