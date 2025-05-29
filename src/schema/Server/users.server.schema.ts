import { model, Schema } from "mongoose";

export const userServerSchema = new Schema({
     users: [
          {
               type: Schema.Types.ObjectId,
               ref: 'User',
          },
     ],
     server: {
          type: Schema.Types.ObjectId,
          ref: 'Servers',
          index: true
     },
     image: {
          type: String,
          default: ""
     },
     status: {
          type: String,
          enum: ["ban", 'timeout', "active"],
          default: 'active'
     },
     timeOut: {
          type: Date,
          default: Date.now,
     }
}, {
     timestamps: true
})

export const userServersModel = model('userServers', userServerSchema)
