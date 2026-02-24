type TStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export interface IPayload {
     userId?: number;
     id?: number;
     receiverId?: number;
     uuid?: string;
     status?: TStatus;
     limit?: string;
     offset?: string;
}
