import { model, Schema } from "mongoose";

export const sectionServerSchema = new Schema({
     server: {
          type: Schema.Types.ObjectId,
          ref: 'Servers',
          index: true
     },
     name: {
          type: String,
          default: ""
     },
     status: {
          type: String,
          enum: ["active", 'deleted'],
          default: 'active'
     },
     section: {
          type: String,
          enum: ["public", 'private'],
          default: 'public'
     }
}, {
     timestamps: true
})

export const sectionModel = model('sections', sectionServerSchema)
