import { redirect } from "next/navigation";
import { requireUser } from "./utils/hooks";
import prisma from "./utils/db";
import { unstable_noStore } from "next/cache";

const getUserData = async(userId: string) =>{
  const data = await prisma.user.findUnique({
    where:{
      id: userId,
    }
  })
  return data
}
export default async function Home() {
  unstable_noStore()
  const session = await requireUser()
  const userData = await getUserData(session.user?.id as string);
  if (userData?.id) {
    if(userData.accountName === "Learner"){
      redirect('/learner/dashboard')
    }else if(userData.accountName === "Tutor"){
      redirect('/tutor/dashboard')
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
    </main>
  );
}