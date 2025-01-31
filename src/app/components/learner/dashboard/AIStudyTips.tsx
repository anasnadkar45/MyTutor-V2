"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getStudyTips } from "@/app/utils/aiHelper"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AIStudyTips() {
    const [studyTips, setStudyTips] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [subject, setSubject] = useState("")
    const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("intermediate")

    const handleGetStudyTips = async () => {
        if (!subject || !difficulty) {
            toast.error("Please fill in all fields")
            return
        }

        setIsLoading(true)
        try {
            const result = await getStudyTips(subject, difficulty)
            setStudyTips(result)
            toast.success("Study tips generated successfully!")
        } catch (error) {
            console.error("Error generating study tips:", error)
            toast.error("Failed to generate study tips. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>AI Study Tips</CardTitle>
                <CardDescription>Get personalized study tips for your subject and level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g., Chemistry"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select
                        value={difficulty}
                        onValueChange={(value: "beginner" | "intermediate" | "advanced") => setDifficulty(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleGetStudyTips} disabled={isLoading} className="w-full">
                    {isLoading ? "Generating..." : "Get Study Tips"}
                </Button>
                {studyTips && (
                    <ScrollArea className="h-[50vh] border-2 rounded-md">
                        <ReactMarkdown className="m-2">{studyTips}</ReactMarkdown>
                    </ScrollArea>
                )}
            </CardContent>
        </Card >
    )
}

