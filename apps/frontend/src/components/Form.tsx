import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
export function Form() {
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");

    function onSubmit() {
        if (!github || !linkedin) {
            toast("Please provide a valid Github and Linkedin URLs")
        }
    }
    return (
        <div className="h-screen w-screen flex justify-center item-center">
            <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    AI interview kickstart
                </h2>
                <div className="p-4">
                    <input placeholder="Linkedin URL" onChange={e => setLinkedin(e.target.value)} />
                </div>
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