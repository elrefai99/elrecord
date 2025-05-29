import { model, Schema } from "mongoose";

export const userServerSchema = new Schema({
     name: {
          type: String,
          default: ""
     },
     image: {
          type: String,
          default: ""
     },
     status: {
          type: String,
          enum: ["active", 'deleted'],
          default: 'active'
     },
}, {
     timestamps: true
})

export const ServersModel = model('Servers', userServerSchema)
