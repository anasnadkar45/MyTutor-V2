import type { BookingType } from "@/app/types/service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UpcomingBookingsProps {
  bookings: BookingType[]
}

export function UpcomingBookings({ bookings }: UpcomingBookingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={booking.Service?.User?.image || ""} />
                <AvatarFallback>{booking.Service?.User?.name?.charAt(0) || "T"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{booking.Service?.title}</p>
                <p className="text-sm text-muted-foreground">{booking.Service?.User?.name}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                {booking.AvailableSlot?.startTime.toLocaleString([], {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
