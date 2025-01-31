import { getUserData } from "@/app/actions"
import prisma from "@/app/utils/db"
import { Topbar } from "@/components/global/Topbar"
import { Wrapper } from "@/components/global/Wrapper"
import Image from "next/image"
import React from "react"
import EmptyScreen from "../../../../../public/Service.svg"
import { ServicesPagination } from "@/app/components/learner/discover/ServicesPagination"
import { TutorMatcher } from "@/app/components/learner/discover/TutorMatcher"

export const getServices = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize
  const [services, totalCount] = await Promise.all([
    prisma.service.findMany({
      include: {
        User: true,
        availableSlots: true,
        Booking: true,
      },
      take: pageSize,
      skip: skip,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.service.count(),
  ])

  return { services, totalCount }
}

export default async function DiscoverPage({ searchParams }: { searchParams: { page: string } }) {
  const page = Number(searchParams.page) || 1
  const pageSize = 9
  const { services, totalCount } = await getServices(page, pageSize)
  const user = await getUserData()

  return (
    <div className="min-h-screen bg-background">
      <Topbar className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Discover Services</h1>
        {user && <TutorMatcher learnerId={user.id} />}
      </Topbar>
      <Wrapper>
        {services.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Services</h2>
            <ServicesPagination
              services={services as any}
              totalCount={totalCount}
              pageSize={pageSize}
              currentPage={page}
            />
          </div>
        ) : (
          <div className="h-[50vh] flex flex-col justify-center items-center gap-4">
            <Image
              src={EmptyScreen || "/placeholder.svg"}
              alt="EmptyScreen"
              width={200}
              height={200}
              className="bg-white p-4 rounded-lg shadow-md"
            />
            <h2 className="text-xl font-semibold">No services available yet</h2>
            <p className="text-muted-foreground">Check back later for new tutoring services!</p>
          </div>
        )}
      </Wrapper>
    </div>
  )
}
