import { createClient } from 'redis';

const client: any = createClient({ url: process.env.NODE_ENV == "development" ? process.env.REDIS_HOST_LOCALHOST : process.env.REDIS_HOST });

client.on("error", (err: any) => console.log("Redis Client Error", err));
client.connect().then(() => console.log(`🛢️  Redis connected successfully: ${process.env.NODE_ENV == "development" ? process.env.REDIS_HOST_LOCALHOST : process.env.REDIS_HOST}`));

process.on('SIGINT', async () => {
     await client.disconnect();
     console.log('Redis connection closed');
     process.exit(0);
});
export default client;
