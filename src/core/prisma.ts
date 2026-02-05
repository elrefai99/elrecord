import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma/client";
import './dotenv'

const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

prisma.$connect().then(() => {
     console.log(`✅ Success connected to ${process.env.NODE_ENV === 'development' ? 'development' : 'production'} Database`)
}).catch((error) => {
     console.log(error);
})

export default prisma;
