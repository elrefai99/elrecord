import { JwtPayload } from "jsonwebtoken";

export interface IResponse {
  status: string;
  code: number;
  message?: string;
  data?: object;
  token?: string;
  refreshToken?: string;
}

// export interface IRequest extends Request {
//   User?: IUser;
// }
// export interface IEmail {
//   email: string;
//   subject: string;
//   template: string;
// }

export interface IToken extends JwtPayload {
  id: string;
  loggedIn?: boolean;
  iat: number;
}
