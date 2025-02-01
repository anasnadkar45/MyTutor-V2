"use server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import prisma from "@/app/utils/db"
import { ServiceType } from "@prisma/client"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey as string)

export async function findBestTutorMatch(
  learnerId: string,
  desiredService: string
): Promise<{ id: string; name: string; service: string } | null> {
  const learner = await prisma.user.findUnique({
    where: { id: learnerId },
    include: { onboarding: true },
  })

  const tutors = await prisma.user.findMany({
    where: {
      accountName: "Tutor",
      Service: {
        some: {
          title: {
            contains: desiredService,
            mode: "insensitive",
          },
        },
      },
    },
    include: {
      Service: {
        where: {
          title: {
            contains: desiredService,
            mode: "insensitive",
          },
        },
      },
      onboarding: true,
    },
  })

  if (tutors.length === 0) {
    return null
  }

  const prompt = `
    Find the best tutor match for a learner with the following profile:
    - Interest: ${learner?.onboarding[0]?.subjectIntrested || "N/A"}
    - Experience: ${learner?.onboarding[0]?.experience || "N/A"}
    - Desired Service: ${desiredService}

    Tutors available:
    ${tutors
      .map(
        (t) => `
      - Name: ${t.name}
      - Services: ${t.Service.map((s) => s.title).join(", ")}
      - Experience: ${t.onboarding[0]?.experience || "N/A"}
    `
      )
      .join("\n")}

    Return only the name of the best matching tutor who offers the desired service.
  `

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const result = await model.generateContent(prompt)
    const bestTutorName = result.response.text().trim()

    const bestTutor = tutors.find((t) => t.name === bestTutorName)

    if (bestTutor && bestTutor.name) {
      const matchedService = bestTutor.Service.find((s) =>
        s.title.toLowerCase().includes(desiredService.toLowerCase())
      )?.id

      return {
        id: bestTutor.id,
        name: bestTutor.name,
        service: matchedService as ServiceType || "Unknown Service",
      }
    }

    return null
  } catch (error) {
    console.error("Error finding best tutor match:", error)
    throw new Error("Failed to find the best tutor match. Please try again later.")
  }
}