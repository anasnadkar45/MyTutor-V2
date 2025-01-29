import { getUserData } from '@/app/actions'
import { BookingCard } from '@/app/components/tutor/bookings/BookingCard'
import prisma from '@/app/utils/db'
import { Topbar } from '@/components/global/Topbar'
import { Wrapper } from '@/components/global/Wrapper'
import Image from 'next/image'
import React from 'react'
import EmptyScreen from '../../../../../public/EmptyScreen.svg'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookingCategories } from '@/app/components/tutor/bookings/BookingCategories'

const getBookings = async (userId: string) => {
    const data = await prisma.service.findMany({
        where: {
            userId: userId,
        },
        include: {
            Booking: {
                include: {
                    AvailableSlot: true,
                    Service: true,
                    User:true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            }
        }
    })
    return data.flatMap(service => service.Booking)
}

const page = async () => {
    const user = await getUserData()
    const bookings = await getBookings(user?.id as string)
    console.log(bookings)
    return (
        <div>
            <Topbar className='justify-between'>
                <h1>Lets see which bookings we have today!</h1>
                {/* <Link href={'/tutor/discover'}>
                    <Button>Find Tutors</Button>
                </Link> */}
            </Topbar>
            <Wrapper>
                <BookingCategories bookings={bookings as any} />

                {bookings.length === 0 && (
                    <div className='h-[83vh] flex flex-col justify-center items-center gap-4'>
                        <Image src={EmptyScreen} alt='EmptyScreen' width={200} height={200} />
                        <h1>A new booking might just be around the corner!</h1>
                        <Link href={'/tutor/service/add'}>
                            <Button>
                                Try Here
                            </Button>
                        </Link>
                    </div>
                )}

            </Wrapper>
        </div>
    )
}

export default page