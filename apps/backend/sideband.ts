import WebSocket from "ws";
import { prisma } from "./db";

export function initsideband(callId: string, interviewId: string) {
    const url = "wss://api.openai.com/v1/realtime?call_id=" + callId;
    const ws = new WebSocket(url, {
        headers: {
            Authorization: "Bearer " + process.env.OPENAI_KEY,
        },
    });

    ws.on("open", function open() {
        console.log("Connected to server.");

        // Send client events over the WebSocket once connected
        ws.send(
            JSON.stringify({
                type: "session.update",
                session: {
                    type: "realtime",
                    instructions: `You are supposed to interview this user on their computer science intellect. Ask around 2-3 questions based on their experience. Please use english only during the interview.Here is everything about the users github, will give you a rough idea about what the user does - ## Github metadata`,
                },
            })
        );
    });
}