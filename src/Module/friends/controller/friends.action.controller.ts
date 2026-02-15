import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { FriendsService } from "../friends.service";

export const listFriendsController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const friendService = new FriendsService()
          const friends = await friendService.all_friends({
               userId: req.user.id,
               status: "ACCEPTED",
               limit: "50",
               offset: "1"
          })
          return res.status(200).json({ code: 200, status: "OK", data: friends })
     }
)

export const acceptRequestController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { requestId } = req.params;
          const friendService = new FriendsService()

          const result = await friendService.accept_friend_request({
               id: parseInt(requestId),
               userId: req.user.id,
               status: "ACCEPTED"
          })

          return res.status(200).json({ code: 200, status: "OK", message: "Friend request accepted", data: result })
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

          return res.status(200).json({ code: 200, status: "OK", message: "Friend request rejected" })
     }
)
