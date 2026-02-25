import { cache_service } from "../../Common/functions/Redis/cache.service.fun";
import prisma from "../../core/prisma";
import { IPayload } from "./@types";

export class user_service {
     private redis: cache_service
     constructor() {
          this.redis = new cache_service()
     }

     public async change_username_service(payload: IPayload) {
          try {
               await prisma.user.update({
                    where: {
                         id: payload.user_id,
                    },
                    data: {
                         username: payload.username?.toLowerCase(),
                    },
               });
               this.redis.deleteData(`user:${payload.user_id}`)
               return { success: true, error: null, message: "Username changed successfully" }
          } catch (error) {
               return { success: false, error: error, message: "Failed to change username" }
          }
     }
}
