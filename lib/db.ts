import { PrismaClient } from "@prisma/client";

const client = () => new PrismaClient();

type Client = ReturnType<typeof client>;

const globalForPrisma = globalThis as unknown as { prisma: Client | undefined };

const prisma = globalForPrisma.prisma || client();

export default prisma;

if (process.env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma;
}
