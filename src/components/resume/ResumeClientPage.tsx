"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ResumePreview from "./ResumePreview";
import { useRouter } from "next/navigation";

import { Resume } from "@/types/resume"; // Create a central type if needed

export default function ResumeClientPage({ resumeId }: { resumeId: string }) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No token found in localStorage");
        router.push("/login");
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/resume/${resumeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResume(res.data.resume);
      } catch (err) {
        console.error("❌ Failed to fetch resume:", err);
        setError(true);
      }
    };

    fetchResume();
  }, [resumeId, router]);

  if (error)
    return (
      <p className="text-red-500 text-center">❌ Failed to load resume.</p>
    );

  if (!resume)
    return <p className="text-center text-gray-500">⏳ Loading resume...</p>;

  return (
    <div>
      <ResumePreview resume={resume} />
      <div className="text-center mt-6">
        <button
          onClick={() =>
            router.push(`/dashboard/resume/${resumeId}/cover-letter`)
          }
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          ✍️ Generate Cover Letter
        </button>
      </div>
    </div>
  );
}
