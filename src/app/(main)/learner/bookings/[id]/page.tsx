import prisma from '@/app/utils/db'
import React from 'react'
import { MyTutorVideo } from './video-player';
import { getUserData } from '@/app/actions';
import { BookingChat } from '../../../../components/chat/booking-chat';
import { Topbar } from '@/components/global/Topbar';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Wrapper } from '@/components/global/Wrapper';
import { unstable_noStore } from 'next/cache';

const getBookingData = async (bookingId: string) => {
    const data = await prisma.booking.findUnique({
        where: {
            id: bookingId
        },
        include: {
            Service: {
                include: {
                    User: {
                        include: {
                            sessions: true
                        }
                    }
                }
            }
        }
    })
    return data;
}
const page = async ({ params }: { params: { id: string } }) => {
    unstable_noStore()
    const booking = await getBookingData(params.id)
    const session = await getUserData()
    return (
        <div>
            <Topbar className='justify-between'>
                <div className='flex items-center gap-6 text-muted-foreground'>
                    <Link href={'/learner/bookings'} className='hover:text-foreground'>
                        <ArrowLeft />
                    </Link>
                    <h1>{booking?.Service?.title}</h1>
                </div>
            </Topbar>
            <Wrapper>
                {booking?.bookingType === "Call" ? (
                    <div className="border rounded-lg p-2 min-h-[82vh] h-fit">
                        <MyTutorVideo
                            booking={booking as any}
                            session={session as any}
                        />
                    </div>
                ) : (
                    <div className="border rounded-lg overflow-hidden h-[84vh]">
                        <BookingChat bookingId={booking?.id as any} currentUser={session as any} otherUser={booking?.Service?.User as any} />
                    </div>
                )}
            </Wrapper>
        </div>
    )
}

export default page