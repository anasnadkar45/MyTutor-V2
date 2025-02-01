"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateLessonPlan } from "@/app/utils/aiHelper"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AILessonPlanner() {
    const [lessonPlan, setLessonPlan] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [subject, setSubject] = useState("")
    const [topic, setTopic] = useState("")
    const [duration, setDuration] = useState(60)

    const handleGenerateLessonPlan = async () => {
        if (!subject || !topic || !duration) {
            toast.error("Please fill in all fields")
            return
        }

        setIsLoading(true)
        try {
            const result = await generateLessonPlan(subject, topic, duration)
            setLessonPlan(result)
            toast.success("Lesson plan generated successfully!")
        } catch (error) {
            console.error("Error generating lesson plan:", error)
            toast.error("Failed to generate lesson plan. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>AI Lesson Planner</CardTitle>
                <CardDescription>Generate a customized lesson plan for your tutoring session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g., Mathematics"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., Quadratic Equations"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number.parseInt(e.target.value))}
                        min={15}
                        max={120}
                    />
                </div>
                <Button onClick={handleGenerateLessonPlan} disabled={isLoading} className="w-full">
                    {isLoading ? "Generating..." : "Generate Lesson Plan"}
                </Button>
                {lessonPlan && (
                    <ScrollArea className="h-[50vh] border-2 rounded-md">
                        <ReactMarkdown className="m-2">{lessonPlan}</ReactMarkdown>
                    </ScrollArea>
                )}
            </CardContent>
        </Card>
    )
}

