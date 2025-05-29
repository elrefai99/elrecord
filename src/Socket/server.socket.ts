import { Namespace, Socket } from "socket.io";
import { socketMiddleware } from "../middleware/authintication/socket.middleware";
import { ServersModel } from "../schema/Server/server.schema";
import { sectionModel } from "../schema/Server/sections.server.schema";

export const ServerSocket = (io: Namespace) => {
     const userSockets = new Map<string, string>();

     io.use(socketMiddleware)

     io.on('connection', (socket: Socket) => {

          const senderID = socket.data.user._id.toString()
          userSockets.set(senderID, socket.id);

          socket.on('send_serer_message', async (server, section, message) => {
               let serverDB = await ServersModel.findById(server)
               let sectionDB = await sectionModel.findOne({ section, server, status: "active" })

               if (!serverDB) {

               }

               if (!sectionDB) {

               }


               const response = {

               }

               socket.emit('message_server_sent', response)
          })
          socket.on('disconnect', () => {
               userSockets.delete(senderID);
          });

     })
}
