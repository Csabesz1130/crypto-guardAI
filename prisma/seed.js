const { PrismaClient } = require('@prisma/client')
const { v4: uuid } = require('uuid')

const prisma = new PrismaClient()

async function main() {
  // upsert admin user
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'password', // DO NOT store plain text in prod
    },
  })

  // sample transaction
  await prisma.transaction.create({
    data: {
      id: uuid(),
      hash: '0xseeded',
      amount: 0.75,
      currency: 'ETH',
      riskLevel: 'LOW',
      timestamp: new Date(),
      from: '0x111',
      to: '0x222',
      status: 'confirmed',
      userId: admin.id,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })