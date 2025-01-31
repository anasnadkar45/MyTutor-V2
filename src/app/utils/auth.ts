import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        GitHub,
    ],
})