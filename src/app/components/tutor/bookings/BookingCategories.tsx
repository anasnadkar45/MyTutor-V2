"use client"

import type React from "react"
import { useState, useMemo } from "react"
import type { BookingType } from "@/app/types/service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isBefore, isAfter, parseISO } from "date-fns"
import { BookingCard } from "./BookingCard"

interface BookingCategoriesProps {
  bookings: BookingType[]
}

export const BookingCategories: React.FC<BookingCategoriesProps> = ({ bookings }) => {
  const [activeTab, setActiveTab] = useState("all")

  const categories = [
    { id: "all", label: "All Bookings" },
    { id: "live", label: "Live" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
  ]

  const getBookingCategory = (booking: BookingType): string => {
    const now = new Date()
    const startTime = (booking.AvailableSlot?.startTime)
    const endTime = booking.AvailableSlot?.endTime

    if (isBefore(now, startTime as any)) {
      return "upcoming"
    } else if (isAfter(now, endTime as any)) {
      return "completed"
    } else {
      return "live"
    }
  }

  const categorizedBookings = useMemo(() => {
    return bookings.reduce(
      (acc, booking) => {
        const category = getBookingCategory(booking)
        acc[category] = [...(acc[category] || []), booking]
        return acc
      },
      {} as Record<string, BookingType[]>,
    )
  }, [bookings, getBookingCategory]) // Added getBookingCategory to dependencies

  const filteredBookings = (category: string) => {
    if (category === "all") return bookings
    return categorizedBookings[category] || []
  }

  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-4">
        {categories.map((category) => (
          <TabsTrigger key={category.id} value={category.id}>
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id}>
          <div className="grid md:grid-cols-3 gap-4">
            {filteredBookings(category.id).map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
          {filteredBookings(category.id).length === 0 && (
            <p className="text-center text-muted-foreground mt-4">
              No {category.id === "all" ? "" : category.label.toLowerCase()} bookings found.
            </p>
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}
