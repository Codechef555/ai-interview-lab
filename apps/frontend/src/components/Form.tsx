import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useNavigate } from "react-router";
export function Form() {
    const [github, setGithub] = useState("");
    const navigate = useNavigate();
    async function onSubmit() {
        if (!github) {
            toast("Please provide a valid Github URL")
            return;
        }
        const response = await axios.post(`${BACKEND_URL}/api/v1/pre-interview`, {
            github
        })

        navigate(`/interview/${response.data.id}`);

    }
    return (
        <div className="h-screen w-screen flex justify-center item-center">
            <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    AI interview kickstart
                </h2>
                <div className="p-4">
                    <input placeholder="Github URL" onChange={e => setGithub(e.target.value)} />
                </div>
                <div className="flex justify-center p-4">
                    <Button onClick={onSubmit}>Start Interview</Button>
                </div>
            </div>
        </div>
    );
}