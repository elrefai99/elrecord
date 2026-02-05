import './core/dotenv'
import "reflect-metadata";
import express, { Request, Response } from 'express';
import * as http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import appConfig, { allowedOrigins } from './app.config';
import prisma from './core/prisma';

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
prisma.$connect().then(() => {
     server.listen(PORT as string, () => {
          console.log("🌐 Server is running on:", process.env.API_ENDPOINT_URL)
     })
     console.log(`✅ Success connected to ${process.env.NODE_ENV === 'development' ? 'development' : 'production'} Database`)
}).catch((error) => {
     console.log(error);
})


