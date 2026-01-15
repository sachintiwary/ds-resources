import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const adapter = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || "file:./dev.db"
})

export const prisma = globalForPrisma.prisma || adapter

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
