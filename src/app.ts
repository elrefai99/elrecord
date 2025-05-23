import 'dotenv/config'
import express, { Request, Response } from 'express'
import { mongoDBConfig } from './config/mongoDB.config'
import siteUtiles from './utils/site.utiles'
import { setupSwagger } from './swagger'
import * as http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import appModule from './app.module'
import { socketFunction } from './socket'


const app = express()

const server = http.createServer(app)
export const ioSocket = new SocketIOServer(server, {
     cors: {
          origin: '*',
     },
})

siteUtiles(app)
appModule(app)
setupSwagger(app)
socketFunction()

app.use(async (_req: Request, res: Response) => {
     res.status(404).send('This is not the API route you are looking for')
})

server.listen(process.env.PORT, () => {
  mongoDBConfig()
  console.log(`✅ Server is running on url: ${process.env.BASE_URL}`)
})
