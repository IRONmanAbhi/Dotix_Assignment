"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API = "http://localhost:5000";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const fetchJobs = async () => {
    let url = `${API}/jobs?`;
    if (status) url += `status=${status}&`;
    if (priority) url += `priority=${priority}`;

    const res = await fetch(url);
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, [status, priority]);

  const runJob = async (id) => {
    await fetch(`${API}/jobs/run-job/${id}`, { method: "POST" });
    fetchJobs();
  };

  return (
    <div>
      <Link href="/create">Create Job</Link>

      <h2>Filters</h2>
      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="running">Running</option>
        <option value="completed">Completed</option>
      </select>

      <select onChange={(e) => setPriority(e.target.value)}>
        <option value="">All Priority</option>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      <h2>Jobs</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>
                <Link href={`/jobs/${job.id}`}>{job.id}</Link>
              </td>
              <td>{job.taskName}</td>
              <td>{job.priority}</td>
              <td>{job.status}</td>
              <td>
                <button
                  disabled={job.status !== "pending"}
                  onClick={() => runJob(job.id)}
                >
                  Run Job
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
