import prisma from "@/app/utils/db"
import { requireUser } from "@/app/utils/hooks"
import { cache } from "react"


export const getBookingData = cache(async (bookingId: string) => {
  const data = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  })
  return data
})

export const getSessionData = cache(async () => {
  return await requireUser()
})

export const useGetBookingData = async (bookingId: string) => {
  const booking = await getBookingData(bookingId)
  const session = await getSessionData()
  return { booking, session }
}
