import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

const pool: pkg.Pool = new pkg.Pool({
     connectionString: process.env.DATABASE_URL,
});

const adapter: PrismaPg = new PrismaPg(pool);

const prisma: PrismaClient = new PrismaClient({
     adapter,
});

export default prisma;
