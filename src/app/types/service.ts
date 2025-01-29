import { ServiceType, AccountType, BookingStatus } from "@prisma/client"

export interface ServiceProps {
    id: string
    serviceType: ServiceType
    title: string
    description: string
    price: number
    duration: number
    availableSlots: AvailableSlotType[]
    createdAt: Date
    updatedAt: Date
    bookings: BookingType[]
    userId?: string
    User?: UserType
    _count?: {
        Booking?: number
    }
}

export interface AvailableSlotType {
    id: string
    startTime: Date
    endTime: Date
    isBooked: boolean
    bookings: BookingType[]
    serviceId?: string
    service?: ServiceProps
}

export interface UserType {
    id: string
    name?: string
    email: string
    emailVerified?: Date
    image?: string
    accountName?: AccountType
    onboardingComplete: boolean
    createdAt: Date
    updatedAt: Date
    services: ServiceProps[]
    bookings: BookingType[]
}

export interface BookingType {
    id: string
    status: BookingStatus
    bookingType: ServiceType
    createdAt: Date
    updatedAt: Date
    userId?: string
    User?: UserType
    serviceId?: string
    Service?: ServiceProps
    availableSlotId?: string
    AvailableSlot?: AvailableSlotType

}