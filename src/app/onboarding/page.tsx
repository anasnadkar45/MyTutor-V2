import React from 'react'
import { Onboarding } from '../components/onboarding/Onboarding'
import { requireUser } from '../utils/hooks'
import prisma from '../utils/db'
import { redirect } from 'next/navigation'
import { unstable_noStore } from 'next/cache'

const getUserData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  })
  return data
}
const page = async () => {
  unstable_noStore()
  const session = await requireUser()
  const userData = await getUserData(session.user?.id as string)

  if (userData?.accountName === "Learner") {
    redirect('/learner/dashboard')
  } else if (userData?.accountName === "Tutor") {
    redirect('/tutor/dashboard')
  }
  return (
    <div>
      <Onboarding />
    </div>
  )
}

export default page