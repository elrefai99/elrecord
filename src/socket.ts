import { ioSocket } from "./app"
import { chatSocket } from "./Socket/Chat/chat.socket"
import { chatRoomsSocket } from "./Socket/Chat/Rooms/rooms.socket"

export const socketFunction = () => {
     const chatNamespace = ioSocket.of('/chat')
     const chatRoomNamespace = ioSocket.of('/chat/room')
     chatSocket(chatNamespace)
     chatRoomsSocket(chatRoomNamespace)
}
