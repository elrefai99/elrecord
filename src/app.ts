import './core/dotenv'
import express, { Request, Response } from 'express';
import * as http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import appConfig, { allowedOrigins } from './app.config';

const app = express()
const server = http.createServer(app)
export let ioSocket: SocketIOServer;

ioSocket = new SocketIOServer(server, {
     cors: {
          origin: allowedOrigins,
     },
})

appConfig(app)

app.use(async (_req: Request, res: Response) => {
     res.status(404).send('This is not the API route you are looking for')
})

const PORT = process.env.PORT || 9999;
server.listen(PORT as string, () => {
     console.log("🌐 Server is running on:", process.env.API_ENDPOINT_URL)
})
