import { useEffect, useState } from "react"
import { useParams } from "react-router"

interface Result {
    transcript: { type: "Assistant" | "User", content: String }[],
    score: number,
    feedback: string,
}
export function Result() {
    const { InterviewId } = useParams();
    const [result, setResult] = useState<Result>({
        score: 0,
        feedback: '',
        transcript: []
    })
    useEffect(() => {

    }, [])
    return <div>
        Result
    </div>
}