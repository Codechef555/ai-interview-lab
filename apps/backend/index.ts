import express from "express";
import { PreInterviewBody } from "./types";
import axios from "axios";
import { scrapeGithub } from "./scrapers/github";
import cors from "cors";
import { prisma } from "./db";
import { initsideband } from "./sideband";
const app = express();

app.use(express.json());
app.use(cors());
// Parse raw SDP payloads posted from the browser
app.use(express.text({ type: ["application/sdp", "text/plain"] }));

//added post method to reject if the pre interview is not decided yet
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

    const githubUrl = data.github.endsWith("/") ? data.github.slice(0, -1) : data.github;
    const githubUsername = githubUrl.split("/").pop();

    const githubData = await scrapeGithub(githubUsername);

    if (!githubUsername) {
        throw new Error("Invalid GitHub URL");
    }

    const interview = await prisma.interview.create({
        data: {
            githubMetadata: JSON.stringify(githubData),
            status: "Pre",
        }
    })
    res.json({ id: interview.id });
})

//Provides info about model and its voice avatar
app.post("/api/v1/session/:interviewId", async (req, res) => {
    const sessionConfig = JSON.stringify({
        type: "realtime",
        model: "gpt-realtime-2.1",
        audio: { output: { voice: "marin" } },
    });
    const fd = new FormData();
    fd.set("sdp", req.body);
    fd.set("session", sessionConfig);

    try {
        const sdpResponse = await fetch("https://api.openai.com/v1/realtime/calls", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_KEY}`,
                "OpenAI-Safety-Identifier": "hashed-user-id",
            },
            body: fd,
        });
        const location = sdpResponse.headers.get('Location');
        const callId = location?.split("/").pop()!;
        console.log(callId)
        // Send back the SDP we received from the OpenAI REST API
        const sdp = await sdpResponse.text();
        res.send(sdp);

        initsideband(callId, req.params.interviewId);

    } catch (error) {
        console.error("Token generation error:", error);
        res.status(500).json({ error: "Failed to generate token" });
    }
});

//registers the data based on the each and every unique id for slot
app.post("/api/v1/session/user/response/:interviewId", async (req, res) => {
    const { message } = req.body;
    await prisma.message.create({
        data: {
            interviewId: req.params.interviewId,
            type: 'User',
            message: message
        }
    })

    res.json({ message: "message saved" });
})

app.get("/api/v1/result/:interviewId", async (req, res) => {
    const interview = await prisma.interview.findFirst({
        where: {
            id: req.params.interviewId
        },
        include: {
            conversations: true
        }
    })

    if (!interview) {
        res.status(411).json({
            message: "interview not found"
        })
        return
    }

    if ()
        res.json({
            score: interview?.score,
            feedback: interview?.feedback,
            transcript: interview?.conversations.map(c => ({
                type: c.type,
                content: c.message,
                createdAt: c.createdAt
            }))
        })
})

app.listen(3001);