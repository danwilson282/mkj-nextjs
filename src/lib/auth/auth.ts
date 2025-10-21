// src/auth.ts or src/lib/auth.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authProvider"; // wherever your config is

export async function auth() {
  return await getServerSession(authOptions);
}
