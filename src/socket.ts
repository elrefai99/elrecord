import { ioSocket } from "./app"
import { chatSocket } from "./Socket/chat.socket"

export const socketFunction = () => {
     const chatNamespace = ioSocket.of('/chat')
     chatSocket(chatNamespace)
}
