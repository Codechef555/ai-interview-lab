import { useEffect, useState } from "react"

export function Result() {

    interface Result {
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