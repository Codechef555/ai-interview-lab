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
                    instructions: "Be extra nice today!",
                },
            })
        );
    });
}