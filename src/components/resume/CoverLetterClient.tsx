// src/components/resume/CoverLetterClient.tsx

"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { handlePrint } from "@/utils/printSection";
import { Editor } from "@tinymce/tinymce-react";

type EducationItem = {
  degree: string;
  institution: string;
  year: string;
};

type ExperienceDescription = {
  id?: string;
  description: string;
};

type ExperienceItem = {
  company: string;
  role: string;
  year: string;
  descriptions: ExperienceDescription[];
};

type ResumeData = {
  fullName: string;
  role: string | null;
  education: EducationItem[];
  experience: ExperienceItem[];
};

export default function CoverLetterClient({ resumeId }: { resumeId: string }) {
  const router = useRouter();

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchResumeDetails = async () => {
      // const token = localStorage.getItem("token");
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await axios.get(
          `/api/resume/${resumeId}/cover-letter-data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setResumeData(res.data.data);

        // ✅ Now fetch saved cover letter (inside try block so we already have token and resumeId)
        const savedRes = await axios.get(`/api/cover-letter/${resumeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (savedRes.data.success && savedRes.data.coverLetter) {
          setCoverLetter(savedRes.data.coverLetter); // auto-fill cover letter box
        }
      } catch (err) {
        console.error("❌ Error fetching resume or saved cover letter", err);
        alert("Failed to load resume data.");
        // router.push("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchResumeDetails();
  }, [resumeId, router]);

  // useEffect(() => {
  //   const fetchResumeDetails = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       router.push("/login");
  //       return;
  //     }

  //     try {
  //       const res = await axios.get(
  //         `/api/resume/${resumeId}/cover-letter-data`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       setResumeData(res.data.data);
  //     } catch (err) {
  //       console.error("❌ Error fetching resume data", err);
  //       alert("Failed to load resume data.");
  //       router.push("/dashboard");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchResumeDetails();
  // }, [resumeId, router]);

  // const fetchSavedCoverLetter = async () => {
  //   try {
  //     const res = await axios.get(`/api/cover-letter/${resumeId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (res.data.success) {
  //       setCoverLetter(res.data.coverLetter);
  //     }
  //   } catch (err) {
  //     console.warn("No saved cover letter found, continuing...", err);
  //   }
  // };

  const handleGenerate = async () => {
    if (!resumeData) return;
    setGenerating(true);
    try {
      const res = await axios.post("/api/ai/generate-cover-letter", {
        fullName: resumeData?.fullName,
        education: resumeData?.education,
        experience: resumeData?.experience,
        role: resumeData?.role,
        prompt: customPrompt,
      });

      setCoverLetter(res.data.coverLetter);
    } catch (err) {
      console.error("❌ Error generating cover letter", err);
      alert("Failed to generate cover letter.");
    } finally {
      setGenerating(false);
    }
  };

  // Add this function below handleGenerate
  const handleSave = async () => {
    try {
      // const token = localStorage.getItem("token");
      const token = Cookies.get("token");
      if (!token) {
        alert("Unauthorized. Please log in again.");
        router.push("/login");
        return;
      }

      const res = await axios.post(
        "/api/cover-letter/save",
        {
          resumeId,
          content: coverLetter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("✅ Cover letter saved successfully!");
      } else {
        alert("❌ Failed to save cover letter.");
      }
    } catch (err) {
      console.error("❌ Error saving cover letter:", err);
      alert("Something went wrong while saving.");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500">⏳ Loading resume data...</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">✍️ AI Cover Letter Generator</h1>

      <textarea
        placeholder="Optional: Add job title, description, or any specific note..."
        className="w-full border p-3 mb-4 rounded"
        rows={4}
        value={customPrompt}
        onChange={(e) => setCustomPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        disabled={generating}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {generating ? "Generating..." : "✨ Generate Cover Letter"}
      </button>

      {coverLetter && (
        <div>
          <div
            className="mt-6 border rounded p-4 bg-gray-50 whitespace-pre-wrap text-sm"
            id="printable-cover-letter"
          >
            <h2 className="text-lg font-semibold mb-2">
              Generated Cover Letter:
            </h2>
            <p>{coverLetter}</p>
          </div>
          <button
            onClick={handleSave}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            💾 Save Cover Letter
          </button>
          <button
            onClick={handlePrint}
            className="mt-2 ml-3 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 print:hidden"
          >
            🖨️ Print Cover Letter
          </button>

          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            initialValue={coverLetter}
            init={{
              height: 500,
              menubar: true,
              toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | code",
              branding: false,
            }}
          />
        </div>
      )}
    </div>
  );
}
