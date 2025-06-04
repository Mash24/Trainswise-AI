const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to the database')
    await prisma.$disconnect()
  } catch (error) {
    console.error('Failed to connect to the database:', error)
  }
}

main() 