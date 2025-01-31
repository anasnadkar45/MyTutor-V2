"use client"

import { createTimeSlot } from "@/app/actions"
import { SubmitButton } from "@/components/global/SubmitButton"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, isBefore, startOfDay, addMinutes as dateAddMinutes, parse, isSameDay } from "date-fns"
import { CalendarIcon, Clock, X } from "lucide-react"
import type React from "react"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import { Toggle } from "@/components/ui/toggle"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { AvailableSlotType } from "@/app/types/service"

interface TimeSlot {
  startTime: string
  endTime: string
  date: Date
}

export const CreateAvailableSlot = ({
  serviceId,
  slotsCreated,
}: { serviceId: string; slotsCreated: AvailableSlotType[] }) => {
  const initialState = { message: "", status: undefined, errors: {} }
  const [state, formAction] = useActionState(createTimeSlot, initialState)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [is24Hour, setIs24Hour] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message)
    } else if (state?.status === "error") {
      toast.error(state.message)
    }
  }, [state])

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(time)
      }
    }
    return slots
  }

  const formatTime = (time: string) => {
    if (is24Hour) return time
    const [hour, minute] = time.split(":")
    const hourNum = Number.parseInt(hour)
    const period = hourNum >= 12 ? "pm" : "am"
    const hour12 = hourNum % 12 || 12
    return `${hour12}:${minute}${period}`
  }

  const handleTimeSlotClick = (time: string) => {
    if (!date) return
    const newSlot = {
      startTime: time,
      endTime: addMinutes(time, 30),
      date: date,
    }
    setTimeSlots([...timeSlots, newSlot])
  }

  const addMinutes = (time: string, minutes: number) => {
    const [hour, minute] = time.split(":").map(Number)
    const totalMinutes = hour * 60 + minute + minutes
    const newHour = Math.floor(totalMinutes / 60) % 24
    const newMinute = totalMinutes % 60
    return `${newHour.toString().padStart(2, "0")}:${newMinute.toString().padStart(2, "0")}`
  }

  const removeTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (timeSlots.length > 0) {
      setIsSubmitting(true)
      for (const slot of timeSlots) {
        const formData = new FormData()
        formData.append("serviceId", serviceId)
        formData.append("date", format(slot.date, "yyyy-MM-dd"))
        formData.append("startTime", slot.startTime)
        formData.append("endTime", slot.endTime)
        await formAction(formData)
      }
      setIsSubmitting(false)
      setTimeSlots([])
    } else {
      toast.error("Please select at least one time slot")
    }
  }

  const isTimeSlotDisabled = (time: string) => {
    if (!date) return false

    const timeDate = parse(time, "HH:mm", new Date())

    // Check against existing slots for the selected date
    for (const slot of slotsCreated) {
      const slotStartDate = new Date(slot.startTime)
      const slotEndDate = new Date(slot.endTime)

      if (
        isSameDay(slotStartDate, date) &&
        timeDate.getHours() === slotStartDate.getHours() &&
        timeDate.getMinutes() === slotStartDate.getMinutes()
      ) {
        return true
      }
    }

    // Check against selected slots for the current date
    for (const slot of timeSlots) {
      if (isSameDay(slot.date, date)) {
        const slotStartDate = parse(slot.startTime, "HH:mm", date)
        const slotEndDate = parse(slot.endTime, "HH:mm", date)

        if (
          (timeDate >= slotStartDate && timeDate < slotEndDate) ||
          (dateAddMinutes(timeDate, 30) > slotStartDate && dateAddMinutes(timeDate, 30) <= slotEndDate) ||
          (timeDate <= slotStartDate && dateAddMinutes(timeDate, 30) >= slotEndDate)
        ) {
          return true
        }
      }
    }

    return false
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{date ? format(date, "EEEE, MMMM d, yyyy") : "Select a date"}</h2>
        <div className="flex items-center gap-2 bg-card rounded-lg p-1">
          <span className="text-sm">12h</span>
          <Toggle pressed={is24Hour} onPressedChange={setIs24Hour} aria-label="Toggle 24 hour format">
            <Clock className="h-4 w-4" />
          </Toggle>
          <span className="text-sm">24h</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[300px] space-y-4">
          <div className="bg-card rounded-lg p-4 border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => isBefore(date, startOfDay(new Date()))}
              className="w-full"
              classNames={{
                head_cell: "text-muted-foreground font-normal pl-[10px] pr-[8px]",
                cell: cn(
                  "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                ),
                day: cn("h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
                day_today: "bg-accent text-accent-foreground rounded-md",
              }}
            />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <ScrollArea className="h-[60vh] border-2 p-2 rounded-md">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {generateTimeSlots().map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    timeSlots.some((slot) => slot.startTime === time && isSameDay(slot.date, date!)) &&
                    "bg-primary text-primary-foreground",
                    isTimeSlotDisabled(time) && "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600",
                  )}
                  onClick={() => handleTimeSlotClick(time)}
                  disabled={isTimeSlotDisabled(time)}
                >
                  {formatTime(time)}
                </Button>
              ))}
            </div>
          </ScrollArea>

          {timeSlots.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Selected Time Slots</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {timeSlots.map((slot, index) => (
                  <div key={index} className="flex justify-between items-center bg-card p-2 border rounded-lg">
                    <span>
                      {format(slot.date, "MMM d")} - {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => removeTimeSlot(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <SubmitButton
                text="Save Time Slots"
                className="w-full mt-4"
                onClick={handleSubmit as any}
                isSubmitting={isSubmitting as boolean}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}