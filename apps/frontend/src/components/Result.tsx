import { useEffect, useState } from "react"

interface Result {
    transcript: { type: "Assistant" | "User", content: String }[],
    score: number,
    feedback: string,
}
export function Result() {
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