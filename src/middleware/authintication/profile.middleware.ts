import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { UserModel } from "../../schema/User/user.schema";
import { redisFunctions } from "../../Script/redis/redis.script";

interface DataStored {
     _id: string;
}

interface RequestAuthentication extends Request {
     user: DataStored;
}

interface responseData {
     _id: string
     username: string
     fullname: string
}

export const profileMiddleware = async (req: RequestAuthentication | any, res: Response, next: NextFunction): Promise<void> => {
     const authHeader = req.headers.authorization;
     const tokenFromAuthHeader = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
     const tokenFromHeader = req.headers.token as string;
     const tokenFromQuery = req.query.token as string;
     const cookie = req.cookies;

     // Use the first available token
     const token = tokenFromAuthHeader || tokenFromHeader || tokenFromQuery || cookie.access_token;

     if (token) {
          const TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET as string;
          jwt.verify(token, TOKEN_SECRET_KEY, async (err: any, decoded: any) => {
               if (err) {
                    res.status(403).json({ code: 403, status: "Forbidden", message: "there was an error creating with Token", });
                    return;
               }
               const classs = new redisFunctions()
               const cacheKey = await classs.getData(decoded._id)

               if (cacheKey) {
                    res.status(200).json({ code: 200, status: "OK", data: cacheKey })
                    return
               }
               const user: responseData | any = await UserModel.findOne({ _id: decoded._id, status: "active" }, { password: 0, notifications: 0, __v: 0, googleId: 0 });
               if (user && user?.tokenVersion === decoded?.vToken) {
                    req.user = user;
                    next();
               }
               else {
                    res.status(403).json({ code: 403, status: "Forbidden", message: "The server is refusing to give the requested resource" });
               }
          });
     } else {
          res.status(401).json({ code: 401, status: "Unauthorized", message: "Authentication failed", });
     }
};
