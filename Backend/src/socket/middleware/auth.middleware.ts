import { Socket } from "socket.io";
import ServerError from "../../utils/api.errors.utils";
import { asyncSocketHandler } from "../../utils/asyncHandler.utils";
import prisma from "../../core/prisma";
import { createPublicKey } from "crypto";
import { V4 } from "paseto";

export const socketMiddleware = asyncSocketHandler(
     async (socket: Socket, next: (err?: Error) => void) => {
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
          const publicKey = createPublicKey(process.env.PUBLIC_ACCESS_TOKEN_SECRET as string)
          await V4.verify(token, publicKey).then(async (payload: any) => {
               const checkUser = await prisma.user.findUnique({ where: { id: payload.data.user_id } })

               if (!checkUser) {
                    next(new ServerError("The server is refusing to give the requested resource", 403));
                    return
               }

               socket.data.user = checkUser;
               next();
          }).catch((_err: any) => {
               next(new ServerError("The server is refusing to give the requested resource", 403));
               return
          })
     }
)
