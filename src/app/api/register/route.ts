import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/email';
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const existingUser = await prisma.user.findUnique({ where: { email } });

  // ✅ If user exists and is verified
  if (existingUser && existingUser.emailVerified) {
    return NextResponse.json(
      { error: 'Email already in use' },
      { status: 400 }
    );
  }

  const token = randomBytes(32).toString('hex');
  const expires = addHours(new Date(), 24); // 24-hour expiry

  if (existingUser && !existingUser.emailVerified) {
    // Delete any existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });

    // Create new token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    const verifyUrl = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}&email=${email}`;
    await sendVerificationEmail(email, verifyUrl);

    return NextResponse.json(
      {
        message:
          'Email already registered but not verified. New verification email sent.',
      },
      { status: 200 }
    );
  }

  // ✅ New user, proceed to register
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  const verifyUrl = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}&email=${email}`;
  await sendVerificationEmail(email, verifyUrl);

  return NextResponse.json(
    { message: 'Account created. Please check your email to verify.' },
    { status: 200 }
  );
}
