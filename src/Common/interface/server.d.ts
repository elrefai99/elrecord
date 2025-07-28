import { Types, Document } from "mongoose"

export interface IServer implements Document {
  owner: Types.ObjectId
  users: [Types.ObjectId]
  status: string
}
