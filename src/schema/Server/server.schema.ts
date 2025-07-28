import { model, Schema } from "mongoose";
import { IServer } from "../../Common/interface/server";

const serverSchema = new Schema<IServer>({
     owner: {
          type: Schema.ObjectId,
          ref: "User",
          required: true,
          index: true
     },
     users: [
          {
               type: Schema.Types.ObjectId,
               ref: 'User',
          },
     ],
     status: {
          type: String,
          enum: ["active", 'deleted', 'archived'],
          default: 'archived'
     },
     image: {
          type: String,
          default: ""
     }
}, {
     timestamps: true
})

export const serverModel = model<IServer>('server', serverSchema)
