"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = "http://localhost:5000";

export default function CreateJob() {
    const router = useRouter();
    const [taskName, setTaskName] = useState("");
    const [priority, setPriority] = useState("LOW");
    const [payload, setPayload] = useState("{}");

    const submit = async () => {
        await fetch(`${API}/jobs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                taskName,
                priority,
                payload: JSON.parse(payload)
            })
        });

        router.push("/");
    };

    return (
        <div>
            <h2>Create Job</h2>

            <input
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />

            <select onChange={(e) => setPriority(e.target.value)}>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>

            <textarea
                rows={10}
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
            />

            <br />
            <button onClick={submit}>Create</button>
        </div>
    );
}
