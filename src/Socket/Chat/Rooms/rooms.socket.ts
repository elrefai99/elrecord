import { Namespace, Socket } from "socket.io";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { socketMiddleware } from "../../../middleware/authintication/socket.middleware";
import { roomModel } from "../../../schema/Chat/rooms.schema";
import { UserModel } from "../../../schema/User/user.schema";
import { bucketName, s3Client } from "../../../config/AWS/s3.aws.config";
import { getContentType } from "../../../Script/upload/image.contenttype";
import { dmRoomModel } from "../../../schema/Chat/room.dm.schema";
import mongoose from "mongoose";

export const chatRoomsSocket = (io: Namespace) => {
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


          socket.on('send_message', async (room: string, receiverID: string, message: string) => {
               socket.join(room)

               let chat = await roomModel.findById(room, { _id: 1, status: 1 })
               const senderUser = await UserModel.findById(new mongoose.Types.ObjectId(senderID), {
                    fullname: 1,
                    username: 1,
                    avatarUrl: 1
               });

               if (chat?.status == "penfing") {
                    chat.status = "active"
               }

               chat!.lastMassage = message;
               await chat?.save()
               let roomDM = await dmRoomModel.create({
                    chat: chat?._id,
                    sender: senderID,
                    message: message,
                    organicMessage: message,
                    wrong: false
               })

               io.to(room).emit("message:sent", {
                    ...roomDM.toObject(),
                    senderID: {
                         _id: senderUser?._id,
                         fullname: `${senderUser?.fullname}`,
                         username: senderUser?.username,
                    }
               })
               const receiverNotification: any = userSockets.get(receiverID);

               socket.to(receiverNotification).emit('notification:message', {
                    title: `${senderUser?.fullname}: ${message}`
               });
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
