import { GoogleGenerativeAI } from "@google/generative-ai"
import type { AccountType } from "@prisma/client"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set in the environment variables.")
}

const genAI = new GoogleGenerativeAI(apiKey)

export async function getAIRecommendations(
  accountType: AccountType,
  subjectInterested: string,
  experience: string,
): Promise<string> {
  const prompt = `
    As an AI tutor assistant, provide personalized recommendations for a ${accountType.toLowerCase()} 
    interested in ${subjectInterested} with ${experience} experience.
    
    Please provide:
    1. Three recommended study or teaching strategies
    2. Two suggested resources (books, websites, or courses)
    3. One tip for effective time management
    4. A motivational quote related to learning or teaching

    Format the response in Markdown.
  `

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch (error) {
    console.error("Error generating AI recommendations:", error)
    throw new Error("Failed to generate recommendations. Please try again later.")
  }
}

export async function generateLessonPlan(subject: string, topic: string, duration: number): Promise<string> {
  const prompt = `
    Create a detailed lesson plan for a ${duration}-minute tutoring session on ${topic} in ${subject}.
    
    Include:
    1. Learning objectives
    2. Introduction (5 minutes)
    3. Main content divided into 2-3 sections
    4. Activities or exercises
    5. Conclusion and recap (5 minutes)
    6. Suggested homework or follow-up tasks

    Format the response in Markdown.
  `

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch (error) {
    console.error("Error generating lesson plan:", error)
    throw new Error("Failed to generate lesson plan. Please try again later.")
  }
}

export async function getStudyTips(
  subject: string,
  difficulty: "beginner" | "intermediate" | "advanced",
): Promise<string> {
  const prompt = `
    Provide study tips for a ${difficulty} level student learning ${subject}.
    
    Include:
    1. Three effective study techniques
    2. Two common misconceptions or pitfalls to avoid
    3. One suggested daily practice routine
    4. A recommended way to track progress

    Format the response in Markdown.
  `

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch (error) {
    console.error("Error generating study tips:", error)
    throw new Error("Failed to generate study tips. Please try again later.")
  }
}

