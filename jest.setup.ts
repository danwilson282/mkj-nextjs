import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import { seedTestDatabase } from './prisma/test-seed';
import dotenv from 'dotenv';

// Load test env
dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

beforeAll(async () => {
  console.log('🧹 Resetting test database...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });

  // Optional: wipe tables clean
  await prisma.$transaction([
    prisma.user.deleteMany(),
  ]);

  // Seed test data
  await seedTestDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});
