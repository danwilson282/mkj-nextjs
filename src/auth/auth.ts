// src/auth.ts or src/lib/auth.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth"; // wherever your config is

export async function auth() {
  return await getServerSession(authOptions);
}
