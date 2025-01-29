import prisma from '@/app/utils/db'
import { Topbar } from '@/components/global/Topbar'
import { Wrapper } from '@/components/global/Wrapper'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { EditService } from './edit/EditService'
import { DeleteService } from './delete/DeleteService'

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
                    <Link href={'/tutor/service'} className='hover:text-foreground'>
                        <ArrowLeft />
                    </Link>
                    <h1>{service?.title}</h1>
                </div>
                <div className='flex gap-2 items-center'>
                    {/* <DeleteService service={service as any}/> */}
                    <Link href={`/tutor/service/${service?.id}/schedule`}>
                        <Button>Create Schedule</Button>
                    </Link>
                </div>
            </Topbar>
            <Wrapper>
                <EditService service={service as any} />
            </Wrapper>
        </div>
    )
}

export default page