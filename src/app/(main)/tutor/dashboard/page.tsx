import { AIStudyTips } from "@/app/components/learner/dashboard/AIStudyTips"
import { AILessonPlanner } from "@/app/components/tutor/dashboard/AILessonPlanner"
import { DashboardStats } from "@/app/components/tutor/dashboard/DashboardStats"
import { UpcomingBookings } from "@/app/components/tutor/dashboard/UpcomingBookings"
import { YourServices } from "@/app/components/tutor/dashboard/YourServices"
import type { BookingType, ServiceProps } from "@/app/types/service"
import prisma from "@/app/utils/db"
import { getUserData, requireUser } from "@/app/utils/hooks"
import { AIRecommendations } from "@/components/global/AIRecommendations"
import { Topbar } from "@/components/global/Topbar"
import { Wrapper } from "@/components/global/Wrapper"

const getBookings = async (userId: string) => {
  const data = await prisma.service.findMany({
    where: {
      userId: userId,
    },
    include: {
      Booking: {
        include: {
          AvailableSlot: true,
          Service: true,
          User: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
      },
    },
  })
  return data.flatMap((service) => service.Booking)
}

const getDashboardStats = async (userId: string) => {
  const totalBookings = await prisma.booking.count({
    where: {
      Service: {
        userId: userId,
      },
    },
  })

  const totalServices = await prisma.service.count({
    where: {
      userId: userId,
    },
  })

  return {
    totalBookings,
    totalServices,
  }
}

const getServices = async (userId: string) => {
  return await prisma.service.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

const TutorDashboardPage = async () => {
  const session = await getUserData()
  const bookings = await getBookings(session.user?.id as string)
  const stats = await getDashboardStats(session.user?.id as string)
  const services = await getServices(session.user?.id as string)

  return (
    <div>
      <Topbar>
        <h1 className="text-2xl font-bold">Hi, {session.user?.name} welcome back!</h1>
      </Topbar>
      <Wrapper>
        <div className="space-y-6">
          <div className="grid gap-8 md:grid-cols-2">
            <AIRecommendations
              accountType={session.user?.accountName as any}
              subjectInterested={session.user?.onboarding[0].subjectIntrested || ""}
              experience={session.user?.onboarding[0].experience || ""}
            />
            {session.user?.accountName === "Tutor" && <AILessonPlanner />}
            {session.user?.accountName === "Learner" && <AIStudyTips />}
          </div>
          <DashboardStats stats={stats} />
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <UpcomingBookings bookings={bookings as BookingType[]} />
            <YourServices services={services as ServiceProps[]} />
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default TutorDashboardPage
