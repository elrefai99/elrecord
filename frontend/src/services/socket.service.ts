import { io, Socket } from 'socket.io-client';
import { env } from '../config/env';
import { ClientToServerEvents, ServerToClientEvents } from '../types/socket';

class SocketService {
     private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

     public connect(): void {
          if (this.socket?.connected) return;

          this.socket = io(`${env.socketUrl}/chat`, {
               withCredentials: true,
               transports: ['websocket'],
               autoConnect: true,
               reconnection: true,
               reconnectionAttempts: 5,
               reconnectionDelay: 1000,
          });

          this.socket.on('connect', () => {
               console.log('Socket connected:', this.socket?.id);
          });

          this.socket.on('connect_error', (err) => {
               console.error('Socket connection error:', err);
          });

          this.socket.on('disconnect', (reason) => {
               console.log('Socket disconnected:', reason);
          });
     }

     public disconnect(): void {
          if (this.socket) {
               this.socket.disconnect();
               this.socket = null;
          }
     }

     public emit<T extends keyof ClientToServerEvents>(
          event: T,
          ...args: Parameters<ClientToServerEvents[T]>
     ): void {
          if (!this.socket) {
               console.warn('Socket not initialized. Call connect() first.');
               return;
          }
          this.socket.emit(event, ...args);
     }

     public on<T extends keyof ServerToClientEvents>(
          event: T,
          listener: ServerToClientEvents[T]
     ): void {
          if (!this.socket) return;
          this.socket.on(event, listener);
     }

     public off<T extends keyof ServerToClientEvents>(
          event: T,
          listener?: ServerToClientEvents[T]
     ): void {
          if (!this.socket) return;
          this.socket.off(event, listener);
     }

     public get id(): string | undefined {
          return this.socket?.id;
     }

     public get connected(): boolean {
          return this.socket?.connected || false;
     }
}

export const socketService = new SocketService();
