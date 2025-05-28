import { model, Schema } from "mongoose";
import { IDM } from "../../interface/dm";

const dmSchema = new Schema<IDM>({
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    index: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true
  },
  status: {
    type: String,
    enum: ["send", 'deleted'],
    default: 'send'
  },
  seen: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
    default: ''
  }
}, {
  timestamps: true
})

export const dmModel = model<IDM>('DM', dmSchema)
