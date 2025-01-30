"use client"
import type React from "react"
import { motion } from "framer-motion"
import { FAQItem } from "./FAQItem"

const faqs = [
    {
        question: "How does AI-powered tutor matching work?",
        answer:
            "Our AI considers your subject interests, experience level, and learning preferences to find the best tutor for you.",
    },
    {
        question: "Can I choose my tutor manually?",
        answer:
            "Yes! While our AI provides recommendations, you can browse tutor profiles and select the one that suits you best.",
    },
    {
        question: "What subjects are available on the platform?",
        answer:
            "We offer tutoring in a wide range of subjects, from academics to professional skills. You can explore available subjects on our platform.",
    },
    {
        question: "How do I book a tutoring session?",
        answer: "Simply sign up, complete your profile, find a tutor, and schedule a session at your preferred time.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept major credit/debit cards and secure online payment methods for hassle-free transactions.",
    },
    {
        question: "Can I cancel or reschedule my session?",
        answer: "Yes, you can cancel or reschedule a session based on the tutor's availability and platform policies.",
    },
    {
        question: "How do tutors get paid?",
        answer: "Tutors receive payments securely through our platform, with easy withdrawals to their linked accounts.",
    },
    {
        question: "Is my personal information safe?",
        answer: "We use advanced security measures to keep your data private and protected.",
    },
]

export const FAQ: React.FC = () => {
    return (
        <section className="relative py-20 text-white" id="faq">
            <div className="absolute flex size-96 rounded-full bg-primary blur-[30rem] top-32 left-1/2 -translate-x-1/2 -z-10"></div>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-xl text-muted-foreground">Find answers to common questions about our tutoring platform</p>
                </motion.div>
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}


