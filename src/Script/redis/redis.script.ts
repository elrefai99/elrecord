import redis from "../../config/redis.config"

export class redisFunctions {
     public async getData<T>(key: string): Promise<T | any> {
          const json = JSON.stringify(key)
          const data = await redis.get(json)
          return data ? JSON.parse(data) : null
     }

     public async setExData<T>(key: string, value: any, expire?: number): Promise<T | any> {
          const json = JSON.stringify(key)
          await redis.setEx(json, expire, value)
     }

     public async setData<T>(key: string, value: any): Promise<T | any> {
          const Keys = JSON.stringify(key)
          const body = JSON.stringify(value)
          await redis.set(Keys, body)
     }

     public async deleteData<T>(key: string,): Promise<T | any> {
          const json = JSON.stringify(key)
          await redis.del(json)
     }
}
