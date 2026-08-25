import express from "express";
import { PreInterviewBody } from "./types";

const app = express();

app.use(express.json());

app.post("api/v1/pre-interview", (req, res) => {
    const { success, data } = PreInterviewBody.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Incorrect body"
        })
        return
    }
})
app.listen(3001);