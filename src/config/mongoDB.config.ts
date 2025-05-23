import { connect } from "mongoose"

export const mongoDBConfig = () => {
     const uri = process.env.mongo_uri as string

     connect(uri).then(() => {
          console.log('✅ Success connected to Elrecord Database')
     }).catch((err) => {
          console.error("MongoDB connection error:", err)
          process.exit(1)
     })
}
