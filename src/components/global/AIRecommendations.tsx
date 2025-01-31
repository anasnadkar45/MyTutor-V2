"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAIRecommendations } from "@/app/utils/aiHelper"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"
import type { AccountType } from "@prisma/client"
import { ScrollArea } from "../ui/scroll-area"

interface AIRecommendationsProps {
    accountType: AccountType
    subjectInterested: string
    experience: string
}

export function AIRecommendations({ accountType, subjectInterested, experience }: AIRecommendationsProps) {
    const [recommendations, setRecommendations] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleGetRecommendations = async () => {
        setIsLoading(true)
        try {
            const result = await getAIRecommendations(accountType, subjectInterested, experience)
            setRecommendations(result)
            toast.success("AI recommendations generated successfully!")
        } catch (error) {
            console.error("Error getting AI recommendations:", error)
            toast.error("Failed to get AI recommendations. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full flex flex-col justify-between">
            <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>
                    Get personalized AI-powered recommendations for your learning or teaching journey
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button onClick={handleGetRecommendations} disabled={isLoading} className="w-full">
                    {isLoading ? "Generating..." : "Get AI Recommendations"}
                </Button>
                {recommendations && (
                    <ScrollArea className="min-h-[50vh] border-2 rounded-md">
                        <ReactMarkdown className="m-2">{recommendations}</ReactMarkdown>
                    </ScrollArea>
                )}
            </CardContent>
        </Card>
    )
}

