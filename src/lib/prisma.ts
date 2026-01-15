// Standard Prisma client initialization for Next.js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// In Prisma 7+, the client picks up the DATABASE_URL from the environment by default.
// If you need to override it, you can pass it in the constructor, but the types 
// for the constructor may vary based on your schema.
export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
