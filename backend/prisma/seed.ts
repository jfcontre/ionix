import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  dotenv.config();

  const password = process.env.USER_ADMIN_PASSWORD || "Passw0rd$"
  const userPassword = await bcrypt.hash(password, 10)

  await prisma.users.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      username: 'admin',
      password: userPassword,
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  })

  const numberOfExecutors = 5; // Change this number to create more or fewer executors
  for (let i = 1; i <= numberOfExecutors; i++) {
    await prisma.users.upsert({
      where: { username: `executor${i}` },
      update: {},
      create: {
        email: `executor${i}@gmail.com`,
        username: `executor${i}`,
        password: userPassword,
        role: 'EXECUTOR',
        status: 'ACTIVE'
      }
    });
  }
}


main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });