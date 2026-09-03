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