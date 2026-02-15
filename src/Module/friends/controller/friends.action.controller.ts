import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { FriendsService } from "../friends.service";

export const acceptRequestController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { requestId } = req.params;
          const friendService = new FriendsService()

          const result = await friendService.accept_friend_request({
               id: parseInt(requestId),
               userId: req.user.id,
               status: "ACCEPTED"
          })

          return res.status(200).json({ code: 200, status: "OK", timeStamp: new Date().toISOString(), success: true, error: false, message: "Friend request accepted", data: result })
     }
)

export const rejectRequestController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { requestId } = req.params;
          const friendService = new FriendsService()

          await friendService.reject_friend_request({
               id: parseInt(requestId),
               userId: req.user.id,
               status: "REJECTED"
          })

          return res.status(200).json({ code: 200, status: "OK", timeStamp: new Date().toISOString(), success: true, error: false, message: "Friend request rejected" })
     }
)
