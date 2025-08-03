"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

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
    // const token = localStorage.getItem("token");
    const token = Cookies.get("token");
    setLoading(true);

    if (!token) {
      console.warn("No token found. Redirecting or skipping fetch.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("/api/my-resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(res.data.resumes);
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
      toast.error("❌ Unauthorized or session expired.");
    } finally {
      setLoading(false);
    }
  };

  fetchResumes();
}, []);


  const handleDelete = async (resumeId: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this resume?"
    );
    if (!confirmDelete) return;

    try {
      // const token = localStorage.getItem("token");
      const token = Cookies.get("token");
      if (!token) {
        console.warn("No token found. Skipping delete.");
        return;
      }
      const res = await axios.delete(`/api/resume/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        alert("✅ Resume deleted.");
        setResumes((prev) => prev.filter((r) => r.id !== resumeId));
      } else {
        alert("❌ Failed to delete resume.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Error deleting resume.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📄 My Resumes</h1>

        {loading ? (
          <p>Loading...</p>
        ) : resumes.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="mb-4">You haven&apos;t created any resume yet.</p>
            <Link href="/resume/builder">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                ➕ Create Resume
              </Button>
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {resumes.map((resume) => (
              <li
                key={resume.id}
                className="border p-4 rounded-md hover:bg-gray-50 transition relative"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <Link href={`/dashboard/resume/${resume.id}`}>
                      <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                        {resume.fullName}
                      </h2>
                    </Link>

                    <p className="text-sm text-gray-600">{resume.summary}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Created at: {new Date(resume.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <Button>
                    <Link
                      href={`/dashboard/resume/${resume.id}/edit`}
                      className="inline-block text-sm text-white"
                    >
                      ✏️ Edit
                    </Link>
                  </Button>
                  <Button
                    onClick={() => handleDelete(resume.id)}
                    className="text-sm bg-red-600 text-white "
                  >
                    Delete Resume
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ProtectedRoute>
  );
}
