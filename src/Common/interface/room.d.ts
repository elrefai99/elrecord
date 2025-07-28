import { Types } from "mongoose"

export interface IRooms {
  senderID: Types.ObjectId
  receiverID: Types.ObjectId
  status: string
  lastMassage: string
}
