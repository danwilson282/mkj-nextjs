// app/api/register/route.ts
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  return NextResponse.json({ user });
}