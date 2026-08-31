import z from "zod";

// with zod add the github in zod of object category 
export const PreInterviewBody = z.object({
    github: z.string()
})
