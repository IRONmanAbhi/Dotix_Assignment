"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        if (!id) return;

        fetch(`${API}/jobs/${id}`)
            .then((res) => res.json())
            .then(setJob);
    }, [id]);

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Loading job details...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4">
            {/* Container */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Job #{job.id}
                    </h1>
                    <Link
                        href="/"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Job Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Task Name</p>
                        <p className="text-lg font-medium text-gray-800">
                            {job.taskName}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">Priority</p>
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                ${job.priority === "HIGH"
                                    ? "bg-red-100 text-red-700"
                                    : job.priority === "MEDIUM"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-green-100 text-green-700"
                                }`}
                        >
                            {job.priority}
                        </span>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold
                ${job.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : job.status === "running"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {job.status}
                        </span>
                    </div>
                </div>

                {/* Payload */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Payload
                    </h2>
                    <pre className="bg-gray-50 border border-gray-200 rounded-xl p-4 overflow-x-auto text-sm text-gray-800 font-mono">
                        {JSON.stringify(job.payload, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );
}
