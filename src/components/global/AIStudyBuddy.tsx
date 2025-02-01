"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAIStudyBuddyResponse } from "@/app/utils/aiStudyBuddy"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"

export function AIStudyBuddy() {
  const [subject, setSubject] = useState("")
  const [userInput, setUserInput] = useState("")
  const [conversation, setConversation] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const conversationEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversationEndRef]) // Updated dependency

  const handleSendMessage = async () => {
    if (!subject || !userInput.trim()) {
      toast.error("Please enter a subject and your message")
      return
    }

    setIsLoading(true)
    try {
      const aiResponse = await getAIStudyBuddyResponse(subject, userInput, conversation)
      setConversation([...conversation, `User: ${userInput}`, `AI: ${aiResponse}`])
      setUserInput("")
    } catch (error) {
      console.error("Error getting AI Study Buddy response:", error)
      toast.error("Failed to get a response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>AI Study Buddy</CardTitle>
        <CardDescription>Your personal AI tutor for interactive learning</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Mathematics, Physics, History"
          />
        </div>
        <div className="h-96 overflow-y-auto border rounded-md p-4 space-y-2">
          {conversation.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-md ${message.startsWith("User:") ? "bg-[#ff9408] text-background font-bold w-fit mr-10" : "ml-10 bg-secondary"}`}
            >
              <ReactMarkdown>{message}</ReactMarkdown>
            </div>
          ))}
          <div ref={conversationEndRef} />
        </div>
        <div className="flex space-x-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a question or discuss a topic..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

