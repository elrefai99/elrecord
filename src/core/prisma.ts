import './dotenv'; // Load environment variables first
import { PrismaClient } from "../generated/prisma";

// Simple Prisma 6 setup - no adapter needed!
const prisma = new PrismaClient();

export default prisma;
