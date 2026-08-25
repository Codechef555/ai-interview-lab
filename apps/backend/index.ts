import express from "express";
import { PreInterviewBody } from "./types";
import axios from "axios";

const app = express();

app.use(express.json());

app.post("api/v1/pre-interview", async (req, res) => {
    const { success, data } = PreInterviewBody.safeParse(req.body);

    if (!success) {
        res.status(411).json({
            message: "Incorrect body"
        });
        return
    }

    const githubUrl = data.github.endsWith("/") ? data.github.slice(0, -1) : data.github;
    const linkedinUrl = data.linkedin.endsWith("/") ? data.linkedin.slice(0, -1) : data.linkedin;

    const githubUsername = githubUrl.split("/").pop();
    const linkedinUsername = githubUrl.split("/").pop();

    const userRepos = await axios.get(`https://api.github.com/users/${githubUsername}/repos`);
    const filterUserRepos =
})
app.listen(3001);