import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import ServerError from "../../utils/api.errors.utils";
import { UserModel } from "../../schema/User/user.schema";

export const socketMiddleware = async (socket: Socket, next: Function) => {
     try {
          const token =
               socket.handshake.auth?.token ||
               socket.handshake.headers?.token ||
               socket.handshake.query?.token;

          if (!token) {
               console.error("Authentication Error: No token provided in socket handshake");
               console.debug("Socket handshake details:", {
                    auth: socket.handshake.auth,
                    headers: socket.handshake.headers,
                    query: socket.handshake.query,
               });
               return next(new Error("Unauthorized: No token provided"));
          }
          const TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET as string;
          jwt.verify(token as string, TOKEN_SECRET_KEY, async (err: any, decoded: any) => {
               if (err) {
                    return next(new Error("Unauthorized: Invalid or expired token"));
               }

               const user = await UserModel.findOne({ _id: decoded._id, status: "active" }, {
                    _id: 1
               });

               if (!user) {
                    next(new ServerError("Unauthorized: Admin access only", 401));
                    return
               }

               // Attach user data to socket like req.user
               socket.data.user = user;
               next();
          });
     } catch (err) {
          return next(new Error("Unauthorized: Internal error"));
     }
};
