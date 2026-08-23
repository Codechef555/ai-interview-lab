import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function Form() {
    const [github, setGithub] = useState("");
    return (
        <div className="h-screen w-screen flex justify-center item-center">
            <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    AI interview kickstart
                </h2>
                <div className="p-4">
                    <input placeholder="Linkedin URL" />
                </div>
                <div className="p-4">
                    <input placeholder="Github URL" />
                </div>
                <div className="flex justify-center p-4">
                    <Button>Start Interview</Button>
                </div>
            </div>
        </div>
    );
}