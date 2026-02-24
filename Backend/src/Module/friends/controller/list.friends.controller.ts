import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { FriendsService } from "../friends.service";
import { IPayload, TStatus } from "../@types";

export const listOfFriendsController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const payload: IPayload = {
               userId: req.user.id,
               status: req.query.status as TStatus,
               limit: req.query.limit as string || "50",
               offset: req.query.offset as string || "1"
          }
          const friendService = new FriendsService()
          const requests = await friendService.all_friends(payload)
          return res.status(200).json({ code: 200, status: "OK", timestamp: new Date().toISOString(), success: true, error: false, message: "List of friends", data: requests })
     }
)
