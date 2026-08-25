import express from "express";
import { PreInterviewBody } from "./types";

const app = express();

app.use(express.json());

app.post("api/v1/pre-interview", (req, res) => {
    const { success, data } = PreInterviewBody.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Incorrect body"
        });
        return
    }

    const githubUrl = data.github.endsWith("/") ? data.github.slice(0, -1) : data.github;
    const linkedinUrl = data.linkedin.endsWith("/") ? data.linkedin.slice(0, -1) : data.linkedin;

    const githubUsername =
    const linkedinUsername =
})
app.listen(3001);