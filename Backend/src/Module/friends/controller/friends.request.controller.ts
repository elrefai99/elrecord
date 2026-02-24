import { NextFunction, Request, RequestHandler, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { FriendsService } from "../friends.service";
import ServerError from "../../../utils/api.errors.utils";
import { v4 as uuidv4 } from 'uuid';

export const requestFriendController: RequestHandler = asyncHandler(
     async (req: Request, res: Response, next: NextFunction) => {
          const payload = req.body
          const friendService: FriendsService = new FriendsService()
          const check_friendship = await friendService.check_friendship(req.user.id as number)

          if (check_friendship) {
               next(new ServerError("You are already friends", 400))
               return
          }
          const uuid = uuidv4()
          await friendService.create_friend_request({
               userId: req.user.id as number,
               receiverId: parseInt(payload.receiverId) as number,
               uuid: uuid,
               status: "PENDING",
          })

          return res.status(200).json({ code: 200, status: "OK", timestamp: new Date().toISOString(), message: "Friend request sent successfully", })
     }
)
