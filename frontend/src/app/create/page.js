"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
                payload: JSON.parse(payload),
            }),
        });

        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4">
            {/* Container */}
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        ➕ Create Job
                    </h1>
                    <Link
                        href="/"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    {/* Task Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Task Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Process logs, Send webhook"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Priority
                        </label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        >
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                    </div>

                    {/* Payload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Payload (JSON)
                        </label>
                        <textarea
                            rows={10}
                            value={payload}
                            onChange={(e) => setPayload(e.target.value)}
                            className="resize-none w-full border border-gray-300 rounded-lg px-4 py-3 font-mono text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                            placeholder='{"key": "value"}'
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Must be valid JSON
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-4">
                        <Link
                            href="/"
                            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </Link>
                        <button
                            onClick={submit}
                            className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md transition"
                        >
                            Create Job
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
