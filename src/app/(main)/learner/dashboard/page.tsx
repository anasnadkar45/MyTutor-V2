import { requireUser } from "@/app/utils/hooks"
import { Topbar } from "@/components/global/Topbar"
import { Wrapper } from "@/components/global/Wrapper"
import type { BookingType, ServiceProps } from "@/app/types/service"
import prisma from "@/app/utils/db"
import { DashboardStats } from "@/app/components/learner/dashboard/DashboardStats"
import { UpcomingBookings } from "@/app/components/learner/dashboard/UpcomingBookings"
import { BookedServices } from "@/app/components/learner/dashboard/BookedServices"
import { unstable_noStore } from "next/cache"

const getBookings = async (userId: string) => {
  return await prisma.booking.findMany({
    where: {
      userId: userId,
      status: "Upcomming",
    },
    include: {
      Service: true,
      AvailableSlot: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  })
}

const getBookedServices = async (userId: string) => {
  return await prisma.service.findMany({
    where: {
      Booking: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      User: true,
      _count: {
        select: { Booking: true },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  })
}

const getDashboardStats = async (userId: string) => {
  const totalBookings = await prisma.booking.count({
    where: {
      userId: userId,
    },
  })

  const upcomingBookings = await prisma.booking.count({
    where: {
      userId: userId,
      status: "Upcomming",
    },
  })

  return {
    totalBookings,
    upcomingBookings,
  }
}

const LearnerDashboardPage = async () => {
  unstable_noStore()
  const session = await requireUser()
  const bookings = await getBookings(session.user?.id as string)
  const bookedServices = await getBookedServices(session.user?.id as string)
  const stats = await getDashboardStats(session.user?.id as string)

  return (
    <div>
      <Topbar>
        <h1 className="text-2xl font-bold">Welcome back, {session.user?.name}!</h1>
      </Topbar>
      <Wrapper>
        <div className="space-y-6">
          <DashboardStats stats={stats} />
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <UpcomingBookings bookings={bookings as BookingType[]} />
            <BookedServices services={bookedServices as any} />
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default LearnerDashboardPage
