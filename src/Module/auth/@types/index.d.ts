export interface ITokenPayload {
     data: { user_id: string };
     role?: string;
     site?: string;
     token_version?: number;
     access_device?: string;
}
