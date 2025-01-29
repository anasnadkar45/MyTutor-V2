import { CreateAvailableSlot } from '@/app/components/tutor/service/CreateAvailableSlot'
import prisma from '@/app/utils/db'
import { Topbar } from '@/components/global/Topbar'
import { Wrapper } from '@/components/global/Wrapper'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const getServiceData = async (serviceId: string) => {
    const data = await prisma.service.findUnique({
        where: {
            id: serviceId
        },
        include: {
            availableSlots: true,
            Booking: true
        }
    })
    return data;
}
const page = async ({ params }: { params: { id: string } }) => {
    const service = await getServiceData(params.id);
    console.log(service)
    return (
        <div>
            <Topbar className='flex justify-between text-foreground'>
                <div className='flex items-center gap-6 text-muted-foreground'>
                    <Link href={`/tutor/service/${params.id}`} className='hover:text-foreground'>
                        <ArrowLeft />
                    </Link>
                    <h1>What schedule are you going to create today</h1>
                </div>
            </Topbar>
            <Wrapper>
                <div>
                    <CreateAvailableSlot serviceId={service?.id as string} slotsCreated={service?.availableSlots as any} />
                </div>
            </Wrapper>
        </div>
    )
}

export default page