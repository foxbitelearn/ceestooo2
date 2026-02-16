// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const initialUsers = [
    { name: "Fathima Z", passcode: "123" },
    { name: "ISHAN", passcode: "321", trackingIds: ["1ea9feab-55f9-4eb5-b30b-11a4bea5fbdc"] },
    { name: "DHRUPAD", passcode: "826", trackingIds: ["1ea9feab-55f9-4eb5-b30b-11a4bea5fbdc"] },
    { name: "SURYATHEJ", passcode: "123", trackingIds: ["1ea9feab-55f9-4eb5-b30b-11a4bea5fbdc"] }
  ]

  for (const user of initialUsers) {
    await prisma.user.upsert({
      where: { name: user.name },
      update: {}, // Don't change existing users
      create: user,
    })
  }
  console.log("Migration finished!")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
