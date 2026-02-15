import { Message, User } from './api';

/**
 * Server to Client Events
 */
export interface ServerToClientEvents {
     // Chat events
     'message:receive': (message: Message) => void;
     'typing:receive': (data: { userId: string; chatId: string; isTyping: boolean }) => void;
     'user:status': (data: { userId: string; status: 'ONLINE' | 'OFFLINE' | 'IDLE' }) => void;

     // Notification events
     'notification:friend_request': (request: any) => void;

     // Connection events
     'error': (error: { message: string }) => void;
}

/**
 * Client to Server Events
 */
export interface ClientToServerEvents {
     // Chat events
     'message:send': (data: { content: string; chatId: string; type: 'DM' | 'CHANNEL' }, callback?: (response: any) => void) => void;
     'typing:send': (data: { chatId: string; isTyping: boolean }) => void;

     // Room events
     'room:join': (roomId: string) => void;
     'room:leave': (roomId: string) => void;
}
