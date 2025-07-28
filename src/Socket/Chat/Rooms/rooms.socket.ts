import { Namespace, Socket } from "socket.io";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { socketMiddleware } from "../../../middleware/authintication/socket.middleware";
import { roomModel } from "../../../schema/Chat/rooms.schema";
import { dmModel } from "../../../schema/Chat/dm.schema";
import { UserModel } from "../../../schema/User/user.schema";
import { notificationChat } from "../../../middleware/notification/chat.middlware";
import { bucketName, s3Client } from "../../../config/AWS/s3.aws.config";
import { getContentType } from "../../../Script/upload/image.contenttype";

export const chatSocket = (io: Namespace) => {
     const userSockets = new Map<string, string>();
     const chatSockets = new Map<string, string>();

     io.use(socketMiddleware)

     io.on('connection', async (socket: Socket) => {
          const senderID: string = socket.data.user._id.toString();

          userSockets.set(senderID, socket.id);
          chatSockets.set(senderID, socket.id);

          socket.on('room:join', (room: string) => {
               socket.join(room)
          })
          socket.on('room:join', (room: string) => {
               socket.leave(room)
          })


          socket.on('send_message', async (receiverID, message) => {
               let room = await roomModel.findOne({
                    $or: [
                         { receiverID, senderID },
                         { receiverID: senderID, senderID: receiverID }
                    ]
               }, { _id: 1 });

               if (!room) {
                    room = await roomModel.create({
                         receiverID,
                         senderID,
                    });
               }

               const chat = await dmModel.create({
                    chatID: room._id,
                    senderID,
                    message
               });

               room.lastMassage = message;
               await room.save();

               const sender = await UserModel.findById(senderID).select('fullname avatar');

               const gReceiver = chatSockets.get(receiverID);
               const gSender = chatSockets.get(senderID);

               if (gReceiver) {
                    io.to(gReceiver).emit('message_sent', {
                         ...chat.toObject(),
                         senderID: {
                              _id: sender?._id,
                              fullname: `${sender?.fullname}`,
                         }
                    });
                    const receiverNotification = userSockets.get(receiverID);
                    await notificationChat(socket, receiverNotification, receiverID, sender, message);
               }

               if (gSender) {
                    io.to(gSender).emit('message_sent', {
                         ...chat.toObject(),
                         senderID: {
                              _id: sender?._id,
                              fullname: `${sender?.fullname}`,
                         }
                    });
               }
          });

          socket.on("upload-chat", async (file: { buffer: ArrayBuffer, name: string }, callback) => {
               try {
                    const fileName = file.name || `file-${Date.now()}`;
                    const fileBuffer = Buffer.from(file.buffer);

                    const command = new PutObjectCommand({
                         Bucket: bucketName,
                         Key: `v-chat/${fileName}`,
                         Body: fileBuffer,
                         ContentType: getContentType(fileName),
                    });

                    await s3Client.send(command);

                    const fileUrl = `${process.env.CDN_CLOUD_URL}/v-chat/${fileName}`;

                    callback({ code: 200, status: "OK", link: fileUrl });
               } catch (err: any) {
                    console.error("S3 upload error:", err);
                    callback({ message: "failure", error: err.message });
               }
          });

          socket.on('disconnect', () => {
               if (userSockets.get(senderID) === socket.id) {
                    userSockets.delete(senderID);
               }
               if (chatSockets.get(senderID) === socket.id) {
                    chatSockets.delete(senderID);
               }
          });

     });
}
