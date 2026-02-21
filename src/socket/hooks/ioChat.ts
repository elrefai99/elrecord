import { Namespace, Socket } from "socket.io";
import prisma from "../../core/prisma";
import { v4 as uuidv4 } from 'uuid';
import { encryptDataFunction } from "../../Common/functions/encrypt";

export const ioChat = (io: Namespace, socket: Socket, userSockets: Map<string, string>) => {
     const senderID: string = socket.data.user._id.toString();
     userSockets.set(senderID, socket.id);

     socket.on('sendMessage', async (room: number, receiverID: string, message: string,) => {
          socket.join(String(room))
          const encrypt_message = encryptDataFunction(message, process.env.ENCRYPTION_KEY as string)

          let rooms = await prisma.rooms.findFirst({
               where: {
                    id: room,
                    OR: [
                         {
                              users: {
                                   has: Number(senderID)
                              }
                         },
                         {
                              users: {
                                   has: Number(receiverID)
                              }
                         }
                    ]
               }
          })
          const chat = await prisma.dMs.create({
               data: {
                    uuid: uuidv4(),
                    users: {
                         set: [Number(senderID), Number(receiverID)]
                    },
                    message: encrypt_message,
                    status: 'DELIVERED',
                    maxSize_number: 5,
                    maxSize_unit: 'MB',
                    maxUsers_number: 5,
                    maxUsers_unit: 'users',
                    rooms: Number(rooms?.id)
               }
          })

          io.to(String(room)).emit('newMessage', {
               chat: {
                    ...chat,
                    message,
               },
               senderID: {
                    _id: Number(senderID),
                    avatar: socket.data.user?.avatar,
                    fullname: `${socket.data.user?.fullname}`,
               }
          })
     })
}
