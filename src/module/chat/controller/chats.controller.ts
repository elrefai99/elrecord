import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { roomModel } from "../../../schema/Chat/rooms.schema";
import mongoose from "mongoose";
import { UserModel } from "../../../schema/User/user.schema";

export const chatController = asyncHandler(
     async (req: Request | any, res: Response, _next: NextFunction) => {
          const { limit = 10, page = 1 } = req.query

          const [result] = await roomModel.aggregate([
               {
                    $match: {
                         $or: [
                              {
                                   receiverID: new mongoose.Types.ObjectId(req.user.id)
                              },
                              {
                                   senderID: new mongoose.Types.ObjectId(req.user.id)
                              }
                         ]
                    }
               }, {
                    $facet: {
                         data: [
                              {
                                   $project: {
                                        senderID: 1,
                                        receiverID: 1,
                                        status: 1,
                                        lastMassage: 1,
                                   }
                              },
                              {
                                   $sort: {
                                        createdAt: 1
                                   }
                              },
                              {
                                   $skip: parseInt(String(limit)) * (parseInt(String(page)) - 1)
                              },
                              {
                                   $limit: parseInt(String(limit))
                              },
                         ],
                         totalMessage: [
                              { $count: "total" }
                         ]
                    }
               }
          ])
          const chat = result?.data || []
          const total = result.totalMessage[0]?.total || 0
          const totalPages = Math.ceil(total / Number(limit))

          const filteredRooms = await Promise.all(chat.map(async (room: any) => {
               const otherUserID =
                    room.senderID.toString() === req.user.id
                         ? room.receiverID
                         : room.senderID;

               const user = await UserModel.findById(otherUserID)
                    .select("fName lName avatar")
                    .lean();
               return {
                    _id: room._id,
                    user,
                    lastMessage: room.lastMassage,
                    createdAt: room.createdAt,
                    updatedAt: room.updatedAt,
               };
          }));

          res.status(200).json({ code: 200, status: "OK", data: filteredRooms, total, totalPages })
     }
)
