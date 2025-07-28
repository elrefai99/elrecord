import { JwtPayload } from "jsonwebtoken";

export interface IResponse {
     status: string;
     code: number;
     message?: string;
     data?: object;
     token?: string;
     refreshToken?: string;
}

export interface IToken extends JwtPayload {
     id: string;
     loggedIn?: boolean;
     iat: number;
}

export interface DataStored {
     _id: string;
}

export interface RequestAuthentication extends Request {
     user: DataStored;
}

export interface responseData {
     _id: string
     username: string
     fullname: string
}

export type AnyObject = { [key: string]: any };
