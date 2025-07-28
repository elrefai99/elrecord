import { ioSocket } from "./app"
import { chatSocket } from "./Socket/Chat/chat.socket"

export const socketFunction = () => {
     const chatNamespace = ioSocket.of('/chat')
     chatSocket(chatNamespace)
}
