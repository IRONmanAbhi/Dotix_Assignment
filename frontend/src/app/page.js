"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4">
      {/* Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Job Dashboard
          </h1>
          <Link
            href="/create"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
          >
            + Create Job
          </Link>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Filter by Status
            </label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="running">Running</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Filter by Priority
            </label>
            <select
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="">All Priority</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-white">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-indigo-50 transition"
                >
                  <td className="px-6 py-4 text-indigo-600 font-medium">
                    <Link href={`/jobs/${job.id}`} className="hover:underline">
                      {job.id}
                    </Link>
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {job.taskName}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${job.priority === "HIGH"
                          ? "bg-red-100 text-red-700"
                          : job.priority === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {job.priority}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${job.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : job.status === "running"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      disabled={job.status !== "pending"}
                      onClick={() => runJob(job.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition
                        ${job.status === "pending"
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      Run Job
                    </button>
                  </td>
                </tr>
              ))}

              {jobs.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
