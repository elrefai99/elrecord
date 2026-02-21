import { cache_service } from "../../Common/functions/Redis/cache.service.fun";
import prisma from "../../core/prisma";
import { PrismaClient } from "../../generated/prisma";
import { IPayload } from "./@types";

export class FriendsService {
     private redis: cache_service
     private prisma: PrismaClient
     constructor() {
          this.redis = new cache_service()
          this.prisma = prisma
     }

     public async create_friend_request(payload: IPayload) {
          const friendships = await this.prisma.friends.create({
               data: {
                    senderId: payload.userId as number,
                    receiverId: payload.receiverId as number,
                    uuid: payload.uuid as string,
                    status: payload.status,
               }
          })
          const cache_key = `friends_${payload.userId}`
          await this.redis.deleteData(cache_key)
          return friendships
     }

     public async accept_friend_request(payload: IPayload) {

          const friendships = await this.prisma.friends.update({
               where: {
                    id: payload.id,
               },
               data: {
                    status: payload.status,
               }
          })
          const cache_key = `friends_${payload.userId}`
          await this.redis.deleteData(cache_key)
          return friendships
     }

     public async reject_friend_request(payload: IPayload) {
          const friendships = await this.prisma.friends.update({
               where: {
                    id: payload.id,
               },
               data: {
                    status: payload.status,
               }
          })
          const cache_key = `friends_${payload.userId}`

          await this.redis.deleteData(cache_key)
          return friendships
     }

     public async all_friends(payload: IPayload) {
          const cache_key = `friends_${payload.userId}`
          const cache_data = await this.redis.getData(cache_key)
          if (cache_data) {
               return cache_data
          }

          const friendships = await this.prisma.friends.findMany({
               where: {
                    status: payload.status,
                    OR: [
                         { senderId: payload.userId },
                         { receiverId: payload.userId }
                    ]
               },
               include: {
                    sender: true,
                    receiver: true
               },
               orderBy: {
                    createdAt: 'desc'
               },
               take: Number(payload.limit),
               skip: (Number(payload.offset) - 1) * Number(payload.limit)
          })

          const data = friendships.map(friendship => {
               const isSender = friendship.senderId === payload.userId
               const friend = isSender ? friendship.receiver : friendship.sender

               return {
                    id: friendship.id,
                    uuid: friendship.uuid,
                    status: friendship.status,
                    createdAt: friendship.createdAt,
                    isSender,
                    user: {
                         id: friend.id,
                         email: friend.email,
                         name: friend.fullname,
                    }
               }
          })

          await this.redis.setData(cache_key, data)
          return data
     }

     public async check_friendship(payload: number) {
          const friendship = await this.prisma.friends.findFirst({
               where: {
                    status: "ACCEPTED",
                    OR: [
                         { senderId: payload },
                         { receiverId: payload }
                    ]
               }
          })
          return friendship
     }
}
