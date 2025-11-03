// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create fake users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email().toLowerCase(),
        },
      })
    )
  );
  // Create a test user with verified email (if it doesn't already exist)
  const testUserEmail = process.env.TEST_USER || 'testuser@example.com';
  const testPassword = process.env.TEST_PASSWORD || 'pass123';
  const hashedTestPassword = await bcrypt.hash(testPassword, 10);
  const verifiedUser = await prisma.user.upsert({
    where: { email: testUserEmail },
    update: {}, // Do nothing if exists
    create: {
      name: 'Test User',
      email: testUserEmail,
      password: hashedTestPassword,
      emailVerified: new Date(), // mark email as verified
    },
  });

  console.log(`✅ Seeded ${users.length} users with posts`);
  console.log('Verified test user:', verifiedUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
