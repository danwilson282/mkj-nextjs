import { PrismaClient } from '@prisma/client';
// import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export async function seedTestDatabase() {
  console.log('🌱 Seeding test database...');

  for (let i = 0; i < 5; i++) {
    await prisma.user.create({
      data: {
        name: "faker.person.fullName()",
        email: "faker.internet.email().toLowerCase()",
      },
    });
  }

  console.log('✅ Test DB seeded');
}

// Run directly from CLI
if (process.argv[1]?.endsWith('test-seed.ts')) {
  seedTestDatabase()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
