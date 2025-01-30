import React from 'react'
import { Divider } from './divider'
import Container from '../global/Container'
import { BarChart, Bolt, CameraIcon, Clock, Lock, LucideIcon, Verified } from 'lucide-react'
import FeatureCard from './FeatureCard'

interface FeatureData {
    id: number
    icon: LucideIcon
    title: string
    description: string
}

const featuresData: FeatureData[] = [
    {
        id: 0,
        icon: Bolt,
        title: 'AI-Powered Matching',
        description: 'Advanced algorithms analyze your learning style and goals to find the perfect tutor match.'
    },
    {
        id: 1,
        icon: Clock,
        title: 'Flexible Scheduling',
        description: 'Book sessions at your convenience with our intuitive scheduling system.'
    },
    {
        id: 2,
        icon: Verified,
        title: 'Verified Tutors',
        description: 'All tutors are thoroughly vetted to ensure high-quality learning experiences.'
    },
    {
        id: 3,
        icon: CameraIcon,
        title: 'Interactive Sessions',
        description: 'Choose between video calls or messaging for personalized learning experiences.'
    },
    {
        id: 4,
        icon: BarChart,
        title: 'Progress Tracking',
        description: 'Monitor your learning journey with detailed progress analytics and insights.'
    },
    {
        id: 5,
        icon: Lock,
        title: 'Secure Platform',
        description: 'Your data and sessions are protected with enterprise-grade security.'
    },
]
export const Features = () => {
    return (
        <div className="relative flex flex-col items-center justify-center w-full" id='features'>
            <Divider text='Features provided by MyTutor' />
            <div className="absolute flex size-40 rounded-full bg-primary blur-[10rem] top-0 left-1/2 -translate-x-1/2 -z-10"></div>

            <div className="flex flex-col items-center justify-center gap-y-8 relative">

                <div className="flex flex-col items-center justify-center text-center gap-y-4 bg-background/0">
                    <Container delay={0.15}>
                        <h1 className="text-3xl md:text-4xl font-bold text-center text-white !leading-tight max-w-4xl mx-auto">
                            The Ultimate {" "}
                            <span className="">
                                Product {" "}
                            </span>
                            We Serve
                        </h1>
                    </Container>
                    <Container delay={0.2}>
                        <p className="max-w-xl mx-auto mt-2 text-base lg:text-lg text-center text-muted-foreground">
                            Experience the power of AI-driven tutoring with features designed to enhance your learning journey.
                        </p>
                    </Container>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-background/0'>
                    {featuresData.map((feature) => (
                        <Container delay={0.15}>
                            <FeatureCard
                                key={feature.id}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                            />
                        </Container>
                    ))}
                </div>
            </div>
        </div>
    )
}
