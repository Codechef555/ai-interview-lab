import WebSocket from "ws";
import { prisma } from "./db";

export function initsideband(callId: string, interviewId: string) {
    const url = "wss://api.openai.com/v1/realtime?call_id=" + callId;
    const ws = new WebSocket(url, {
        headers: {
            Authorization: "Bearer " + process.env.OPENAI_KEY,
        },
    })
}