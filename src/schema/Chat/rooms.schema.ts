import { model, Schema } from "mongoose";
import { IRooms } from "../../interface/room";

export const roomSchema = new Schema<IRooms>({
     senderID: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          index: true
     },
     receiverID: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          index: true
     },
     status: {
          type: String,
          enum: ["active", 'deleted'],
          default: 'active'
     },
     lastMassage: {
          type: String,
          default: '',
          required: true
     }
}, {
     timestamps: true
})

export const roomModel = model<IRooms>('roomChat', roomSchema)
