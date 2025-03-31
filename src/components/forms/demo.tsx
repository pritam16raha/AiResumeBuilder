"use client";

import { ResumeFormData } from "@/types/resume";
import axios from "axios";
import { useRef, useState } from "react";

type Props = {
  next: () => void;
  data: ResumeFormData;
  updateFormData: (data: Partial<ResumeFormData>) => void;
};

export default function StepOne({ next, data, updateFormData }: Props) {
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    updateFormData({
      ...data,
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    });

    next();
  };

  const handleRegenerate = async () => {
    if (!data.fullName || !data.role || !data.stack || !data.experience) {
      alert("⚠️ Please fill in all fields to generate summary.");
      return;
    }

    try {
      setLoading(true);
      updateFormData({ summary: "" }); // ✅ clear existing

      const res = await axios.post("/api/ai/generate-summary", {
        fullName: data.fullName,
        role: data.role,
        stack: data.stack,
        experience: data.experience,
        prompt: customPrompt,
      });

      updateFormData({ summary: res.data.summary });

      setTimeout(() => {
        summaryRef.current?.focus();
      }, 100);
    } catch (err) {
      console.error("AI Summary Generation Failed:", err);
      alert("❌ Failed to generate summary. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 👤 Personal Info */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Full Name</label>
        <input
          name="fullName"
          defaultValue={data.fullName}
          className="border px-4 py-2 rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Email</label>
        <input
          name="email"
          type="email"
          defaultValue={data.email}
          className="border px-4 py-2 rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Phone</label>
        <input
          name="phone"
          type="tel"
          defaultValue={data.phone}
          className="border px-4 py-2 rounded-md"
          required
        />
      </div>

      {/* 🧠 AI-Assisted Summary Section */}
      <hr className="my-4" />
      <h3 className="text-lg font-semibold text-gray-700">
        🤖 AI-Assisted Summary
      </h3>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Optional Prompt
        </label>
        <input
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="e.g. Highlight leadership or remote work experience"
          className="border px-4 py-2 rounded-md"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Generated Summary
        </label>
        <textarea
          ref={summaryRef}
          value={data.summary}
          onChange={(e) => updateFormData({ summary: e.target.value })}
          className="border px-4 py-2 rounded-md"
          rows={4}
        />
      </div>

      {/* ✨ Regenerate Button */}
      <button
        type="button"
        onClick={handleRegenerate}
        disabled={loading}
        className="text-sm text-blue-600 hover:underline mt-1"
      >
        ✨ {loading ? "Generating..." : "Regenerate Summary with AI"}
      </button>

      {/* Next button */}
      <div className="pt-4 text-right">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Next →
        </button>
      </div>
    </form>
  );
}
