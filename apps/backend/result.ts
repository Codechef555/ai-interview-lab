import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { zodToJsonSchema } from "zod-to-json-schema"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
const outputSchema = z.object({
    feedback: z.string().describe("Feedback for the User"),
    score: z.int().describe("Score out of 10 for their interview.")
})
export const calculateResult(messages: { type: "Assistant" | "User", message: string, createdAt: Date }[]){
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: RESULT_PROMPT.replace(`{{USER_TRANSCRIPT}}`, JSON.stringify(messages)),
        config: {
            responseFormat: { text: { mimeType: "application/json", schema: zodToJsonSchema(outputSchema) } },
        },
    });
    console.log(response.text!);
    const result = outputSchema.parse(JSON.parse(response.text!));
    return result;
}