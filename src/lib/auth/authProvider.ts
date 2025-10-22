// src/lib/auth.ts (or src/auth/config.ts — your choice)
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import nodemailer from "nodemailer";
export const authOptions = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      // Optional: customize email message
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const { host } = new URL(url);
        // You can use your own email service instead of nodemailer here
        const transport = nodemailer.createTransport(provider.server);
        await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: `Sign in to ${host}\n${url}\n\n`,
          html: `<p>Click <a href="${url}">here</a> to sign in to ${host}</p>`,
        });
      },
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Missing email or password");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("User not found");
        if (!user.emailVerified) {
              throw new Error("Please verify your email before logging in.");
        }
        const isValid = await bcrypt.compare(credentials.password, user.password ?? "");
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { 
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-request", // shown after requesting email
    error: "/auth/error", // handle errors like "email not verified"
   },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user){
        token.id = user.id
      }
      if (user && account?.provider === "email") {
        token.userId = user.id;

        if (!user.name) {
          // Optionally derive a name from the email
          const defaultName = user.email?.split("@")[0];

          await prisma.user.update({
            where: { id: user.id },
            data: { name: defaultName ?? "Magic Link User" },
          });

          // Optionally reflect in token immediately
          token.name = defaultName;
        }
      }
      return token;
      // if (user) token.user = user;
      // return token;
    },
    async session({ session, token }) {
      if (session.user){
        session.user.id = token.id as string
      }
      return session
      // if (token?.user) session.user = token.user as any;
      // return session;
    },
  },
});
