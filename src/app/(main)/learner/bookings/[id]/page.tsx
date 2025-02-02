import prisma from "@/app/utils/db"
import { MyTutorVideo } from "./video-player"
import { getUserData } from "@/app/actions"
import { BookingChat } from "../../../../components/chat/booking-chat"
import { Topbar } from "@/components/global/Topbar"
import Link from "next/link"
import { ArrowLeft, Star } from "lucide-react"
import { Wrapper } from "@/components/global/Wrapper"
import { unstable_noStore } from "next/cache"
import { StarRating } from "@/app/components/learner/bookings/StarRating"
import { CompleteBookingButton } from "@/app/components/learner/bookings/CompleteBookingButton"

const getBookingData = async (bookingId: string) => {
  const data = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      Service: {
        include: {
          User: {
            include: {
              sessions: true,
            },
          },
        },
      },
      Rating: true,
    },
  })
  return data
}

const page = async ({ params }: { params: { id: string } }) => {
  unstable_noStore()
  const booking = await getBookingData(params.id)
  const session = await getUserData()
  console.log(booking)
  return (
    <div>
      <Topbar className="justify-between">
        <div className="flex items-center gap-6 text-muted-foreground">
          <Link href={"/learner/bookings"} className="hover:text-foreground">
            <ArrowLeft />
          </Link>
          <h1>{booking?.Service?.title}</h1>
        </div>
      </Topbar>
      <Wrapper className="grid md:grid-cols-4 gap-4">
        <div className="col-span-3">
          {booking?.bookingType === "Call" ? (
            <div className="border rounded-lg p-2 min-h-[82vh] h-fit">
              <MyTutorVideo booking={booking as any} session={session as any} />
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden h-[84vh]">
              <BookingChat
                bookingId={booking?.id as any}
                currentUser={session as any}
                otherUser={booking?.Service?.User as any}
              />
            </div>
          )}
        </div>

        <div className="col-span-1 space-y-4">
          <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Booking Status</h2>
            <p className="mb-4">Current status: {booking?.status}</p>
            {booking?.status !== "Completed" && <CompleteBookingButton bookingId={booking?.id as any} />}
          </div>

          {!booking?.Rating && (
            <div className="p-4 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Rate this session</h2>
              <StarRating bookingId={booking?.id as any} />
            </div>
          )}

          {booking?.Rating && (
            <div className="p-4 border rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Your Rating</h2>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`${booking.Rating && star <= booking.Rating.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </Wrapper>
    </div>
  )
}

export default page

