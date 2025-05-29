import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { dmModel } from "../../../schema/Chat/dm.schema";

export const dmChatController = asyncHandler(
     async (req: Request, res: Response, _next: NextFunction) => {
          const { id } = req.params
          const { limit = 10, page = 1 } = req.query

          const [result] = await dmModel.aggregate([
               {
                    $lookup: {
                         from: 'users',
                         localField: 'senderID',
                         foreignField: '_id',
                         as: 'senderID',
                    },
               },
               {
                    $addFields: {
                         'senderID': { $arrayElemAt: ['$senderID', 0] },
                    },
               },
               {
                    $match: {
                         $and: [
                              {
                                   chatID: new mongoose.Types.ObjectId(id)
                              }
                         ]
                    }
               },
               {
                    $facet: {
                         data: [
                              {
                                   $project: {
                                        "senderID._id": 1,
                                        "senderID.fName": 1,
                                        "senderID.lName": 1,
                                        "senderID.avatar": 1,
                                        status: 1,
                                        seen: 1,
                                        message: 1,
                                        createdAt: 1
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

          res.status(200).json({ code: 200, status: "OK", data: chat, total, totalPages })
     }
)
