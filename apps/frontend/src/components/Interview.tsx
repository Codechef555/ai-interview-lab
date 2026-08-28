import { BACKEND_URL } from "@/lib/config";
import { useEffect, useRef } from "react";
import { useParams } from "react-router"
import { DeepgramClient } from "@deepgram/sdk";

export function Interview() {
    const { InterviewId } = useParams();
    const audioRef = useRef<HTMLAudioElement>(null);
    const client = new DeepgramClient();

    useEffect(() => {
        (async () => {
            // Create a peer connection
            const pc = new RTCPeerConnection();

            // Set up to play remote audio from the model
            audioRef.current = document.createElement("audio");
            audioRef.current.autoplay = true;
            pc.ontrack = (e) => (audioRef.current!.srcObject = e.streams[0]!);

            // Add local audio track for microphone input in the browser
            const ms = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            const socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
                'token',
                'YOUR_DEEPGRAM_API_KEY'
            ]);
            socket.onopen = () => {
                const mediaRecorder = new MediaRecorder(ms, { mimeType: 'audio/webm' });
                mediaRecorder.start(250);
                mediaRecorder.addEventListener('dataavailable', (event) => {
                    socket.send(event.data);
                })
            }

            socket.onmessage = (message) => {
                const received = JSON.parse(message.data);
                const transcript = received.channel.alternative[0].transcript;

                if (transcript) {
                    console.log(transcript);
                }
            }


            //     pc.addTrack(ms.getTracks()[0]!);

            //     // Set up data channel for sending and receiving events
            //     // const dc = pc.createDataChannel("oai-events");

            //     // Start the session using the Session Description Protocol (SDP)
            //     const offer = await pc.createOffer();
            //     await pc.setLocalDescription(offer);

            //     const sdpResponse = await fetch(`${BACKEND_URL}/api/v1/session${InterviewId}`, {
            //         method: "POST",
            //         body: offer.sdp,
            //         headers: {
            //             "Content-Type": "application/sdp",
            //         },
            //     });

            //     const answer = {
            //         type: "answer" as "answer",
            //         sdp: await sdpResponse.text(),
            //     };
            //     await pc.setRemoteDescription(answer);
        })()
    }, [InterviewId])
    return <div>
        <audio autoPlay ref={audioRef}></audio>
        Interview
    </div>
}