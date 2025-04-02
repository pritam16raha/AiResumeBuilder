"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

type Resume = {
  id: string;
  fullName: string;
  summary: string;
  createdAt: string;
};

export default function DashboardPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/my-resumes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("data", res);

        setResumes(res.data.resumes);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
        alert("❌ Unable to fetch resumes.");
      } finally {
        setLoading(false);
      }

      
    };

    fetchResumes();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📄 My Resumes</h1>

      {loading ? (
        <p>Loading...</p>
      ) : resumes.length === 0 ? (
        <p className="text-gray-500">No resumes found.</p>
      ) : (
        <ul className="space-y-4">
          {resumes.map((resume) => (
            <li
              key={resume.id}
              className="border p-4 rounded-md hover:bg-gray-50 transition"
            >
              <Link href={`/dashboard/resume/${resume.id}`}>
                <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                  {resume.fullName}
                </h2>
              </Link>
              <p className="text-sm text-gray-600">{resume.summary}</p>
              <p className="text-xs text-gray-400 mt-2">
                Created at: {new Date(resume.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
