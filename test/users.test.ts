import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User model (integration)', () => {
  it('should have seeded users', async () => {
    const users = await prisma.user.findMany({});
    expect(users.length).toBeGreaterThan(0);
  });

  it('can create a new user', async () => {
    const user = await prisma.user.create({
      data: { name: 'Alice', email: 'alice@example.com' },
    });

    const found = await prisma.user.findUnique({ where: { id: user.id } });
    expect(found?.email).toBe('alice@example.com');
  });
});
