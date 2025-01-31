import { getUserData } from "@/app/actions"
import { BookingCategories } from "@/app/components/learner/bookings/BookingCategories"
import prisma from "@/app/utils/db"
import { Topbar } from "@/components/global/Topbar"
import { Wrapper } from "@/components/global/Wrapper"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import EmptyScreen from '../../../../../public/EmptyScreen.svg'
import Calendar from '../../../../../public/Calendar.avif'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { BookingType } from "@/app/types/service"
import { unstable_noStore } from "next/cache"

const getBookings = async (userId: string) => {
  const data = await prisma.booking.findMany({
    where: {
      userId: userId,
    },
    include: {
      Service: true,
      AvailableSlot: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  return data
}

const Page = async () => {
  unstable_noStore()
  const user = await getUserData()
  const bookings = await getBookings(user?.id as string)

  return (
    <div>
      <Topbar className="justify-between">
        <h1 className="text-2xl font-bold">Your Bookings</h1>
        <Link href={"/learner/discover"}>
          <Button>Find Tutors</Button>
        </Link>
      </Topbar>
      <Wrapper>
        <BookingCategories bookings={bookings as BookingType[]} />
        {bookings.length === 0 && (
          <div className='h-[73vh] flex flex-col justify-center items-center gap-4'>
            <Image src={EmptyScreen} alt='EmptyScreen' width={200} height={200} />
            <h1 className="text-muted-foreground">Start searching for experts to book their time for insifgtful 1:1 sessions!</h1>
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-4">
                  <div className="flex justify-start items-center gap-4">
                    <Image src={Calendar} alt="Calendar" height={60} width={60} />
                    <div className="flex flex-col justify-start text-muted-foreground">
                      <h1 className="text-foreground text-xl">Book a call</h1>
                      <p className="text-xs">Search for tutors on MyTutor</p>
                    </div>
                  </div>
                  <Link href={'/learner/discover'}>
                    <Button>
                      Try Here
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}
      </Wrapper>
    </div>
  )
}

export default Page
