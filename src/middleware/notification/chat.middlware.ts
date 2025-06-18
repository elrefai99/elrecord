import { Socket } from "socket.io";
import { userChat } from "./@types/types";

export const notificationChat = async (socket: Socket, receiverSocket: any, _receiver: any, sender: userChat | any, message: string) => {
     socket.to(receiverSocket).emit('notification_message', {
          title: `${sender?.fName}: ${message}`
     });
}
