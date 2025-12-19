"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API = "http://localhost:5000";

export default function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        if (!id) return;

        fetch(`${API}/jobs/${id}`)
            .then((res) => res.json())
            .then(setJob);
    }, [id]);

    if (!job) return <p>Loading...</p>;

    return (
        <div>
            <h2>Job #{job.id}</h2>
            <p>Task: {job.taskName}</p>
            <p>Priority: {job.priority}</p>
            <p>Status: {job.status}</p>

            <h3>Payload</h3>
            <pre>{JSON.stringify(job.payload, null, 2)}</pre>
        </div>
    );
}
