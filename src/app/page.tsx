import { redirect } from "next/navigation";
import { requireUser } from "./utils/hooks";
import prisma from "./utils/db";
import { unstable_noStore } from "next/cache";
import { auth } from "./utils/auth";
import Navbar from "@/components/marketing/navbar";
import { Wrapper } from "@/components/global/Wrapper";
import Hero from "@/components/marketing/Hero";
import { LandingMarquee } from "@/components/marketing/LangingMarquee";
import { Features } from "@/components/marketing/Features";
import HowItWorks from "@/components/marketing/HowItWorks";
import {FAQ} from "@/components/marketing/FAQ";
import {Footer} from "@/components/marketing/Footer";

const getUserData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  })
  return data
}
export default async function Home() {
  unstable_noStore()
  const session = await auth()
  let userData
  if (session?.user?.id) {
    userData = await getUserData(session?.user?.id as string);
  }
  if (userData?.id) {
    if (userData.accountName === "Learner") {
      redirect('/learner/dashboard')
    } else if (userData.accountName === "Tutor") {
      redirect('/tutor/dashboard')
    }
  }
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full z-40 relative bg-[#080808]">
        <Wrapper className="py-20 relative space-y-20">
          <Hero />
          <LandingMarquee />
          <Features />
          <HowItWorks />
          <FAQ />
        </Wrapper>
      </main>
      <Footer />
    </>
  );
}