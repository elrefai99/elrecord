import { Types } from "mongoose"

export interface IDM {
  chat: Types.ObjectId
  sender: Types.ObjectId
  status: string
  seen: boolean
  message: string
}
