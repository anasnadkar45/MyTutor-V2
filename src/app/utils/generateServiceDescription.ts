"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

export async function generateServiceDescription(serviceTitle: string, tutorExperience: string): Promise<string> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in the environment variables.");
  }

  const prompt = `
    Create an engaging and informative description for a tutoring service with the following details:
    - Service Title: ${serviceTitle}
    - Tutor Experience: ${tutorExperience}

    The description should be approximately 100 words long and highlight the benefits of the service.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Error generating description:", error);
    throw new Error("Failed to generate description. Please try again later.");
  }
}