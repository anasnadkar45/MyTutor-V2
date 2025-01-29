"use client"
import type { ServiceProps } from "@/app/types/service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock, LoaderCircle } from "lucide-react"
import { bookTimeSlot } from "@/app/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { ServiceType } from "@prisma/client"

const BookingTypes: ServiceType[] = ["Call", "message"]

export const BookService = ({ service }: { service: ServiceProps }) => {
  const router = useRouter()
  const [dates, setDates] = useState<Date[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedSlot, setSelectedSlot] = useState<string>()
  const [isBooking, setIsBooking] = useState(false)
  const [bookingType, setBookingType] = useState<ServiceType | undefined>(undefined)

  useEffect(() => {
    const uniqueDates = new Set<string>()
    const sortedDates: Date[] = []

    service.availableSlots.forEach((slot) => {
      const dateStr = format(new Date(slot.startTime), "yyyy-MM-dd")
      if (!uniqueDates.has(dateStr)) {
        uniqueDates.add(dateStr)
        sortedDates.push(new Date(slot.startTime))
      }
    })

    setDates(sortedDates.sort((a, b) => a.getTime() - b.getTime()))
  }, [service.availableSlots])

  const handleBooking = async () => {
    if (!selectedSlot || !bookingType) {
      toast.error("Please select a time slot and booking type")
      return
    }

    try {
      setIsBooking(true)

      const formData = new FormData()
      formData.append("slotId", selectedSlot)
      formData.append("serviceId", service.id)
      formData.append("bookingType", bookingType)

      const response = await bookTimeSlot(null, formData)

      if (response?.status === "success") {
        toast.success(response.message)
        router.refresh()
      } else if (response?.status === "error") {
        toast.error(response?.message)
      }
    } catch (error) {
      toast.error("Failed to book the slot. Please try again.")
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>When would you like to schedule?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent className="px-6">
            {dates.map((date) => (
              <CarouselItem
                onClick={() => setSelectedDate(date)}
                key={date.toDateString()}
                className="basis-1/3 hover:cursor-pointer"
              >
                <Card
                  className={cn(
                    "transition-colors duration-200",
                    selectedDate?.toDateString() === date.toDateString()
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary",
                  )}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="text-center">
                      <p className="text-sm font-medium mb-1">{format(date, "EEEE")}</p>
                      <p className="text-2xl font-bold">{format(date, "d")}</p>
                      <p className="text-sm font-medium">{format(date, "MMMM")}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-8" />
          <CarouselNext className="mr-8" />
        </Carousel>

        {selectedDate && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Available Times</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
              {service.availableSlots
                .filter(
                  (slot) =>
                    format(new Date(slot.startTime), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd") &&
                    !slot.isBooked,
                )
                .map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedSlot === slot.id ? "default" : "secondary"}
                    className={cn(
                      "h-auto py-4 px-6",
                      isBooking && selectedSlot === slot.id && "opacity-50 cursor-not-allowed",
                    )}
                    onClick={() => setSelectedSlot(slot.id)}
                    disabled={isBooking}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium">{format(new Date(slot.startTime), "h:mm a")}</span>
                    </div>
                  </Button>
                ))}
            </div>

            {selectedSlot && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Booking Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  {BookingTypes.map((type) => (
                    <Card
                      key={type}
                      onClick={() => setBookingType(type)}
                      className={cn(
                        "cursor-pointer transition-colors duration-200",
                        bookingType === type ? "border-primary" : "hover:bg-secondary",
                      )}
                    >
                      <CardHeader>
                        <CardTitle>{type}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedSlot && bookingType && (
              <Button disabled={isBooking} onClick={handleBooking} className="w-full">
                {isBooking ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" /> Booking
                  </>
                ) : (
                  "Book Now"
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
