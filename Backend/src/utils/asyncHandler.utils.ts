import { Request, Response, NextFunction, RequestHandler } from "express";
import { ExtendedError, Socket } from "socket.io";
import { send_to_discord } from "./notification-discord";

export const asyncHandler =
     (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler =>
          async (req: Request, res: Response, next: NextFunction) => {
               try {
                    await fn(req, res, next);
               } catch (err: any) {
                    send_to_discord(
                         `**Route:** ${req.method} ${req.originalUrl}\n**Error:** ${err?.message ?? String(err)}`
                    ).catch(() => { });
                    next(err);
               }
          };

export const asyncSocketHandler = (
     fn: (socket: Socket, next: (err?: ExtendedError) => void) => Promise<void> | void) => {
     return (socket: Socket, next: (err?: ExtendedError) => void): void => {
          Promise.resolve(fn(socket, next)).catch(next);
     };
};
