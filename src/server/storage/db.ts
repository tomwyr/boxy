import { PrismaClient } from "@prisma/client"
import { items } from "./data"

export const dbInit = initPrisma()

async function initPrisma() {
  const prisma = new PrismaClient()

  try {
    await prisma.$connect()

    const hasItems = (await prisma.item.count()) > 0
    if (!hasItems) {
      await prisma.item.createMany({
        data: items,
      })
    }
  } catch {
    await prisma.$disconnect()
  }

  return prisma
}
