import { GoogleGenAI, Type } from "@google/genai";
import { CareerAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeResume(resumeText: string, targetRole?: string): Promise<CareerAnalysis> {
  const model = "gemini-3.1-pro-preview";
  
  const prompt = `
    Analyze the following resume text and provide a comprehensive career analysis.
    ${targetRole ? `The user is targeting the role of: ${targetRole}` : "Identify the most suitable career path based on their experience."}
    
    Resume Text:
    ${resumeText}
    
    Provide the analysis in JSON format with the following structure:
    - summary: A brief professional summary of the candidate.
    - currentSkills: List of skills identified in the resume (name, category, level).
    - missingSkills: List of skills the candidate should acquire for their target or suggested role (name, category, level).
    - roadmap: A step-by-step learning path (title, description, duration, resources).
    - interviewQuestions: Top 5 interview questions tailored to their profile and target role (question, answerHint, category).
    - suggestedRoles: 3-5 job titles they are qualified for or should aim for.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          currentSkills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                level: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] }
              },
              required: ["name", "category", "level"]
            }
          },
          missingSkills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                level: { type: Type.STRING, enum: ["Beginner", "Intermediate", "Advanced"] }
              },
              required: ["name", "category", "level"]
            }
          },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
                resources: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["title", "description", "duration", "resources"]
            }
          },
          interviewQuestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                answerHint: { type: Type.STRING },
                category: { type: Type.STRING, enum: ["Technical", "Behavioral", "Soft Skills"] }
              },
              required: ["question", "answerHint", "category"]
            }
          },
          suggestedRoles: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["summary", "currentSkills", "missingSkills", "roadmap", "interviewQuestions", "suggestedRoles"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to generate analysis from Gemini");
  }

  return JSON.parse(response.text) as CareerAnalysis;
}
