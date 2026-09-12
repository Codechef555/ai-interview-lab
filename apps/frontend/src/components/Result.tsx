import { useEffect } from "react"
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router"

// added transcript and score with feedback

interface Result {
    transcript: { type: "Assistant" | "User", content: String, createdAt: Date }[],
    score: number,
    feedback: string,
    status: "Done" | "Inprogress" | "Pre"
}
export function Result() {

    useEffect(() => {

    }, []);

    const { InterviewId } = useParams();
    const [result, setResult] = useState<Result>({
        score: 0,
        feedback: '',
        transcript: [],
        status: "Pre"
    })
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/result/${InterviewId}`)
            .then(response => {
                setResult(response.data);
            })
        let intervalId = setInterval(() => {
            axios.get(`${BACKEND_URL}/api/v1/result/${InterviewId}`)
                .then(response => {
                    setResult(response.data);
                })
        }, 5 * 1000)

        return () => {
            clearInterval(intervalId);
        }
    }, [InterviewId]);
    //add the timestamp for the interview session to check the time needed to answer the question from the candidate side

    return <div>
        Score - {result.score}
        Feedback - {result.feedback}

        Transcript -
        {result.transcript.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()).map(x => <div>
            {x.type} - {x.content}
        </div>)}
    </div>
}