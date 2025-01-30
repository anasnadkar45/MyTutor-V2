"use client"
import type React from "react"
import { UserPlus, Target, UserCheck, Rocket } from "lucide-react"
import { motion } from "framer-motion"
import StepCard from "./StepCard"
import { Divider } from "./divider"
import Container from "../global/Container"

const steps = [
    {
        number: 1,
        title: "Sign Up",
        description: "Create your account in minutes and tell us about your learning goals",
        icon: UserPlus,
    },
    {
        number: 2,
        title: "Share Your Goals",
        description: "Complete a quick assessment to help us understand your needs",
        icon: Target,
    },
    {
        number: 3,
        title: "Get Matched",
        description: "Our AI matches you with the perfect tutor for your needs",
        icon: UserCheck,
    },
    {
        number: 4,
        title: "Start Learning",
        description: "Begin your personalized learning journey with expert guidance",
        icon: Rocket,
    },
]

const HowItWorks = () => {
    return (
        <section className="relative py-10 bg-[#0f0f0f] lg:max-w-7xl mx-auto rounded-3xl p-8" id="how-it-works">
            <div className="absolute flex size-40 rounded-full bg-cyan-400 bg-opacity-60 blur-[10rem] top-0 left-1/2 -translate-x-1/2 z-10"></div>
            <div className="flex flex-col items-center justify-center gap-8 relative">
                <div className="flex flex-col items-center justify-center text-center gap-y-4 bg-background/0">
                    <Container delay={0.15}>
                        <h1 className="text-3xl md:text-4xl font-bold text-center !leading-tight max-w-4xl mx-auto">
                            How {" "}
                            <span className="">
                                It {" "}
                            </span>
                            Works
                        </h1>
                    </Container>
                    <Container delay={0.2}>
                        <p className="max-w-xl mx-auto text-base lg:text-lg text-center text-muted-foreground">
                            Your journey to successful learning in four simple steps.
                        </p>
                    </Container>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <StepCard key={step.number} {...step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks

