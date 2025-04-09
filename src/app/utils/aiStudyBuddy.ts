import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set in the environment variables.")
}

const genAI = new GoogleGenerativeAI(apiKey)

export async function getAIStudyBuddyResponse(
  subject: string,
  userInput: string,
  conversationHistory: string[] = [],
): Promise<string> {
  const prompt = `
    You are an AI Study Buddy, an expert in ${subject}. Your goal is to help students learn and understand concepts in an engaging and interactive way. 
    Provide clear explanations, examples, and ask thought-provoking questions to encourage active learning.

    Conversation history:
    ${conversationHistory.join("\n")}

    User: ${userInput}
    AI Study Buddy:
  `

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch (error) {
    console.error("Error generating AI Study Buddy response:", error)
    throw new Error("Failed to generate a response. Please try again later.")
  }
}

