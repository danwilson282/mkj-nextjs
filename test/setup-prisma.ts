// test/setup-prisma.ts
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

// Force loading .env.test
dotenv.config({ path: '.env.test' });

console.log('🧪 Using test database:', process.env.DATABASE_URL);

const prisma = new PrismaClient();

beforeAll(async () => {
  console.log('🧹 Resetting test database...');
  // Reset test database
  execSync('npx prisma migrate reset --force  --skip-seed', {
    stdio: 'inherit',
    env: {
      ...process.env, // inherit all current env vars
      DATABASE_URL: process.env.DATABASE_URL, // ensure correct one
    },
  });

  // Seed test data
  execSync('npx tsx prisma/test-seed.ts', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL,
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

export { prisma };
