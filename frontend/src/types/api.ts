/**
 * Common API Response wrapper
 */
export interface ApiResponse<T> {
     code: number;
     status: string;
     message: string;
     data?: T;
     token?: string; // For login response
     errors?: any;
}

/**
 * User Interface
 */
export interface User {
     id: string;
     fullname: string;
     username: string;
     email: string;
     avatar: string;
     role: string;
     status: string;
     phone?: string;
     country_code?: string;
     created_at: string;
     updated_at: string;
}

/**
 * Auth DTOs
 */
export interface LoginRequest {
     email: string;
     password: string;
}

export interface RegisterRequest {
     fullname: string;
     email: string;
     password: string;
     phone: string;
     country_code: string;
}

export interface LoginResponse {
     user_id: string;
     role: string;
     access_device: string;
}

/**
 * Friends DTOs
 */
export interface FriendRequest {
     id: string;
     sender_id: string;
     receiver_id: string;
     status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
     created_at: string;
     sender?: User;
     receiver?: User;
}

export interface Friend {
     id: string;
     user_id: string;
     friend_id: string;
     status: string;
     created_at: string;
     friend_data?: User;
}

/**
 * Chat DTOs
 */
export interface Message {
     id: string;
     sender_id: string;
     channel_id?: string;
     dm_id?: string;
     content: string;
     attachments?: string[];
     created_at: string;
     updated_at: string;
     sender?: User;
}

export interface Chat {
     id: string;
     type: 'DM' | 'GROUP_DM' | 'CHANNEL';
     name?: string;
     participants: User[];
     last_message?: Message;
     unread_count?: number;
}

export interface Server {
     id: string;
     name: string;
     owner_id: string;
     icon?: string;
     members_count?: number;
}

export interface Channel {
     id: string;
     server_id: string;
     name: string;
     type: 'TEXT' | 'VOICE';
     position: number;
}
