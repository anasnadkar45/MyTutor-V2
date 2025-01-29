"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookingType } from "@/app/types/service"

export function UpcomingBookings({bookings}:{bookings:BookingType[]}) {

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
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${booking.User?.name}`} />
                <AvatarFallback>{booking.User?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{booking.User?.name}</p>
                <p className="text-sm text-muted-foreground">{booking.Service?.title}</p>
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
