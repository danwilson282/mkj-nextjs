// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      // 👇 Add your custom fields here
      role?: string;
    } & DefaultSession["user"]; // ensures compatibility
  }

  interface User {
    id: string;
    role?: string;
  }
}
