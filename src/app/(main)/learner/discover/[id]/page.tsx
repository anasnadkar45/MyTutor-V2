import { BookService } from '@/app/components/learner/discover/BookService'
import prisma from '@/app/utils/db'
import { Topbar } from '@/components/global/Topbar'
import { Wrapper } from '@/components/global/Wrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Calendar, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const getServiceData = async (serviceId: string) => {
    const data = await prisma.service.findUnique({
        where: {
            id: serviceId
        },
        include: {
            availableSlots: true,
            User: true,
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
                    <Link href={'/learner/discover'} className='hover:text-foreground'>
                        <ArrowLeft />
                    </Link>
                    <h1>{service?.title}</h1>
                </div>
                <Button>Book Now</Button>
            </Topbar>
            <Wrapper className='grid md:grid-cols-7 gap-6'>
                <Card className='md:col-span-4 h-fit'>
                    <CardHeader className='bg-[#f0b026] rounded-t-lg'>
                        <CardTitle className='flex justify-between items-center mb-4'>
                            <h1 className='text-muted'>{service?.User?.name}</h1>
                            <Badge className='bg-foreground hover:bg-foreground/90'>
                                <span className='text-xl mr-3 text-background'>5  </span><Star fill='#f0b026' />
                            </Badge>
                        </CardTitle>
                        <CardDescription className='flex justify-between items-center'>
                            <h1 className='text-3xl font-bold text-muted'>{service?.title}</h1>
                            <Image
                                src={service?.User?.image as string}
                                alt={service?.User?.name as string}
                                width={100}
                                height={100}
                                className='rounded-full'
                            />
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='p-0'>
                        <div className='grid grid-cols-2 h-16 border-y'>
                            <div className='border-r flex justify-center items-center'>
                                <Badge variant={'outline'} className='px-6 py-3 rounded-full'>
                                    {service?.price}
                                </Badge>
                            </div>
                            <div className='flex justify-center items-center'>
                                <span className='mr-2'><Calendar /></span>
                                {service?.duration} mins {service?.serviceType}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className='text-muted-foreground py-6'>
                        <p>{service?.description}</p>
                    </CardFooter>
                </Card>
                <BookService service={service as any}/>
            </Wrapper>
        </div >
    )
}

export default page