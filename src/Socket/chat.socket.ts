import { Namespace, Socket } from "socket.io";
import { socketMiddleware } from "../middleware/authintication/socket.middleware";
import { roomModel } from "../schema/Chat/rooms.schema";
import { dmModel } from "../schema/Chat/dm.schema";
import { UserModel } from "../schema/User/user.schema";

export const chatSocket = (io: Namespace) => {
  const userSockets = new Map<string, string>();

  io.use(socketMiddleware)

  io.on('connection', (socket: Socket) => {

    const senderID = socket.data.user._id.toString()
    userSockets.set(senderID, socket.id);

    socket.on('send_message', async (receiver, message) => {
      let chat = await roomModel.findOne({ $or: [{ receiverID: receiver, senderID: senderID }, { receiverID: senderID, senderID: receiver }] }, {
        _id: 1
      })

      if (!chat) {
        chat = await roomModel.create({
          receiverID: receiver,
          senderID: senderID,
          lastMassage: message
        })
      }

      const dm = await dmModel.create({
        chat: chat?._id,
        sender: senderID,
        message: message
      })

      const sender = await UserModel.findById(senderID, {
        fullname: 1,
        avatar: 1
      })

      const response = {
        ...dm.toObject(),
        user: {
          fullname: sender?.fullname,
          avatar: sender?.avatar
        }
      }

      socket.emit('message_sent', response)
    })
    socket.on('disconnect', () => {
      userSockets.delete(senderID);
    });

  })
}
