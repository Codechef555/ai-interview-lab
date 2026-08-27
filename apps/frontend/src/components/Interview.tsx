import { useEffect } from "react";
import { useParams } from "react-router"

export function Interview() {
    const { InterviewId } = useParams();

    useEffect(() => {

    }, [])
    return <div>
        Interview
    </div>
}