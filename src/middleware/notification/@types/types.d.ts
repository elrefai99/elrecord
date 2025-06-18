import { Types } from "mongoose"

export type chatNotification = {

}
export type userChat = {
     _id: Types.ObjectId
     fName: string
     lName: string
     avatar: string
}
