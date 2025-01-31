import { redirect } from "next/navigation";
import { auth } from "./auth";
import prisma from "./db";

export async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function getUserData() {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id
    },
    include:{
      onboarding:true
    }
  })
  return {
    userId: session?.user?.id,
    user
  }
}