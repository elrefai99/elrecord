import redis from "../../../config/redis.config";

export class cacheService {
     public async getData<T>(key: any): Promise<T | any> {
          const json = JSON.stringify(key)
          const data = await redis.get(json)
          return data ? JSON.parse(data) : null
     }

     public async setExData<T>(key: any, value: any, expire?: number): Promise<T | any> {
          const json = JSON.stringify(key)
          const body = JSON.stringify(value)
          await redis.setEx(json, expire, body)
     }

     public async setData<T>(key: any, value: any): Promise<T | any> {
          const Keys = JSON.stringify(key)
          const body = JSON.stringify(value)
          await redis.set(Keys, body)
     }

     public async deleteData<T>(key: any,): Promise<T | any> {
          const json = JSON.stringify(key)
          await redis.del(json)
     }
}
