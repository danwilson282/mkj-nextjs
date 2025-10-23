import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  if (!token || !email)
    return NextResponse.json(
      { error: 'Missing token or email' },
      { status: 400 }
    );

  const existingToken = await prisma.verificationToken.findUnique({
    where: { identifier_token: { identifier: email, token } },
  });

  if (!existingToken || existingToken.expires < new Date()) {
    return NextResponse.json(
      { error: 'Token is invalid or expired' },
      { status: 400 }
    );
  }

  // Update user as verified
  await prisma.user.update({
    where: { email },
    data: {
      emailVerified: new Date(),
    },
  });

  // Delete the used token
  await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: email, token } },
  });

  //logout the user if already logged in
  return NextResponse.redirect(
    `${process.env.NEXTAUTH_URL}/auth/login?signout`
  );
}
