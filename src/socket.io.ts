import { Namespace } from "socket.io";
import { ioSocket } from "./app";
import { chatSocket } from "./socket/chat.socket";


export const socketFunction = () => {
     const chatNamespace: Namespace = ioSocket.of('/chat');

     chatSocket(chatNamespace)
};
