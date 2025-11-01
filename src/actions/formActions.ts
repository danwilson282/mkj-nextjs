// app/actions/sendFormData.ts
'use server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/email';
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';
export async function register(formData: FormData) {
  const data = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;
  const {email, name, password} = data
  console.log('Server received:', data);
  if (!email || !password) {
    console.log("No email or password set")
    return
  }
    
  
  if (typeof email !== 'string') {
  throw new Error('Email must be a string');
}
  if (typeof password !== 'string') {
  throw new Error('Password must be a string');
}
  if (typeof name !== 'string') {
  throw new Error('Name must be a string');
}
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser && existingUser.emailVerified) {
    console.log("Email already in use")
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

    return 
  }
  // ✅ New user, proceed to register
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await prisma.user.create({
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
    return
  // Example: send to an API, save to database, etc.
  // await fetch('https://api.example.com/submit', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // });

//   return { success: true };
}

export async function fallback(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  console.log('Server received:', data);
//   return { success: false };
}

export const formActions = async (slug: string) => {
    switch (slug){
        case "register":
            return register
        default:
            return fallback
    }
}