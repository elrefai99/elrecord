// import { cache_service } from "../../Common/Redis/cache.service.fun";
import prisma from "../../core/prisma";
import { UserStatus } from "../../generated/prisma/enums";
import { register_dto } from "./DTO/index.dto";
import bcrypt from "bcryptjs";

export class auth_service {
     // private redis: cache_service
     // constructor() {
     //      this.redis = new cache_service()
     // }

     public async find_user_by_email(email: string): Promise<any> {
          try {
               const user = await prisma.user.findUnique({
                    where: {
                         email: email,
                         status: UserStatus.ACTIVE
                    },
               });
               return user;
          } catch (error) {
               throw error;
          }
     }

     public async create_user(data: register_dto): Promise<any> {
          try {
               const salt = await bcrypt.genSalt(10);
               const hashedPassword = await bcrypt.hash(data.password, salt);
               const user = await prisma.user.create({
                    data: {
                         fullname: data.fullname,
                         email: data.email,
                         password: hashedPassword,
                         phone: data.phone,
                         country_code: data.country_code,
                    },
               });
               return user;
          } catch (error) {
               throw error;
          }
     }
}
