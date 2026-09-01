import { useEffect, useState } from "react"

export function Result() {

    interface Result {
        transcript: { type: "Assistant" | "User", content: String },
        score: number,
        feedback: string,
    }
    const [result, setResult] = useState({
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