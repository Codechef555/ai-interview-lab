import express from "express";
import { PreInterviewBody } from "./types";
import axios from "axios";
import { scrapeGithub } from "./scrapers/github";
import cors from "cors";
import { prisma } from "./db";
const app = express();

app.use(express.json());
app.use(cors());
// Parse raw SDP payloads posted from the browser
app.use(express.text({ type: ["application/sdp", "text/plain"] }));


app.post("api/v1/pre-interview", async (req, res) => {
    const { success, data } = PreInterviewBody.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Incorrect body"
        });
        return
    }

    //const githubUrl = data.github.endsWith("/") ? data.github.slice(0, -1) : data.github;
    //const githubUsername = githubUrl.split("/").pop();
    //const githubData = await scrapeGithub(githubUsername);

    const githubUrl = data.github.endsWith("/")
        ? data.github.slice(0, -1)
        : data.github;
    const githubUsername = githubUrl.split("/").pop();
    if (!githubUsername) {
        throw new Error("Invalid GitHub URL");
    }
    const githubData = await scrapeGithub(githubUsername);

    const interview = await prisma.interview.create({
        data: {
            githubMetadata: JSON.stringify(githubData),
            status: "Pre",
        }
    })


    res.json({ id: interview.id });

})

app.post("/api/v1/session", (req, res) => {
    const sessionConfig = JSON.stringify({
        type: "realtime",
        model: "gpt-realtime-2.1",
        audio: { output: { voice: "marin" } },
    });
    const fd = new FormData();
    fd.set("sdp", req.body);
    fd.set("session", sessionConfig);

    try {
        const r = await fetch("https://api.openai.com/v1/realtime/calls", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "OpenAI-Safety-Identifier": "hashed-user-id",
            },
            body: fd,
        });
        // Send back the SDP we received from the OpenAI REST API
        const sdp = await r.text();
        res.send(sdp);
    } catch (error) {
        console.error("Token generation error:", error);
        res.status(500).json({ error: "Failed to generate token" });
    }
});
app.listen(3001);