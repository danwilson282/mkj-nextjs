// test/setup-prisma.ts
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import { seedTestDatabase } from '../prisma/test-seed';

// Force loading .env.test
dotenv.config({ path: '.env.test' });

console.log('🧪 Using test database:', process.env.DATABASE_URL);

const prisma = new PrismaClient();

beforeAll(async () => {
  console.log('🧹 Resetting test database...');
  // Reset test database
execSync('npx prisma migrate reset --force', {
    stdio: 'inherit',
    env: {
      ...process.env, // inherit all current env vars
      DATABASE_URL: process.env.DATABASE_URL, // ensure correct one
    },
  });
  // Optional: clear tables after reset (should be empty already)
  // await prisma.user.deleteMany();

  // Seed test data
  await seedTestDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});

export { prisma };
