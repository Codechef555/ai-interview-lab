import { useParams } from "react-router"

export function Interview() {
    const { InterviewId } = useParams();
    return <div>
        Interview
    </div>
}