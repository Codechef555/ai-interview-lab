import { useEffect, useRef } from "react";
import { useParams } from "react-router"

export function Interview() {
    const { InterviewId } = useParams();
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Create a peer connection
        const pc = new RTCPeerConnection();

        // Set up to play remote audio from the model
        audioElement.current = document.createElement("audio");
        audioElement.current.autoplay = true;
        pc.ontrack = (e) => (audioElement.current.srcObject = e.streams[0]);

        // Add local audio track for microphone input in the browser
        const ms = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        pc.addTrack(ms.getTracks()[0]);

        // Set up data channel for sending and receiving events
        const dc = pc.createDataChannel("oai-events");

        // Start the session using the Session Description Protocol (SDP)
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const sdpResponse = await fetch("/session", {
            method: "POST",
            body: offer.sdp,
            headers: {
                "Content-Type": "application/sdp",
            },
        });

        const answer = {
            type: "answer",
            sdp: await sdpResponse.text(),
        };
        await pc.setRemoteDescription(answer);
    }, [InterviewId])
    return <div>
        <audio autoPlay ref={audioRef}></audio>
        Interview
    </div>
}