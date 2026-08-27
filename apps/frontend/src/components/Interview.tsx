import { useEffect } from "react";
import { useParams } from "react-router"

export function Interview() {
    const { InterviewId } = useParams();

    useEffect(() => {

    }, [InterviewId])
    return <div>
        Interview
    </div>
}