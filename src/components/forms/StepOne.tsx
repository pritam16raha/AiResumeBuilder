"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { useResumeForm } from "@/context/ResumeFormContext";

type Props = {
  next: () => void;
};

export default function StepOne({ next }: Props) {
  const summaryRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const { data, updateData } = useResumeForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    next();
  };

  const handleRegenerate = async () => {
    if (
      !data.fullName ||
      !data.role ||
      !data.stack ||
      !data.experienceSummary
    ) {
      alert("⚠️ Please fill in all fields to generate summary.");
      return;
    }

    try {
      setLoading(true);
      updateData({ summary: "" });

      const res = await axios.post("/api/ai/generate-summary", {
        fullName: data.fullName,
        role: data.role,
        stack: data.stack,
        experience: data.experienceSummary,
        prompt: data.prompt || "",
      });

      updateData({ summary: res.data.summary });

      setTimeout(() => {
        summaryRef.current?.focus();
      }, 100);
    } catch (err) {
      console.error("AI Summary Generation Failed:", err);
      alert("❌ Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-700">👤 Personal Info</h2>

      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Full Name</label>
        <input
          name="fullName"
          value={data.fullName}
          onChange={(e) => updateData({ fullName: e.target.value })}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Email</label>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Phone</label>
        <input
          name="phone"
          type="tel"
          value={data.phone}
          onChange={(e) => updateData({ phone: e.target.value })}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <hr className="my-4" />
      <h2 className="text-lg font-semibold text-gray-700">
        🤖 AI-Assisted Summary
      </h2>

      {/* Role */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Desired Role
        </label>
        <input
          type="text"
          value={data.role || ""}
          onChange={(e) => updateData({ role: e.target.value })}
          placeholder="e.g., Frontend Developer"
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Tech Stack */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Tech Stack</label>
        <input
          type="text"
          value={data.stack || ""}
          onChange={(e) => updateData({ stack: e.target.value })}
          placeholder="e.g., React, Tailwind CSS, Supabase"
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Experience Summary */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Experience Summary
        </label>
        <input
          type="text"
          value={data.experienceSummary || ""}
          onChange={(e) => updateData({ experienceSummary: e.target.value })}
          placeholder="e.g., Internship at ABC, built 2 SaaS products"
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Optional Prompt */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Optional Prompt
        </label>
        <input
          type="text"
          value={data.prompt || ""}
          onChange={(e) => updateData({ prompt: e.target.value })}
          placeholder="e.g., Highlight leadership and communication skills"
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Generated Summary */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm font-medium text-gray-600">
          Generated Summary
        </label>
        <textarea
          ref={summaryRef}
          value={data.summary}
          onChange={(e) => updateData({ summary: e.target.value })}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={5}
        />
      </div>

      {/* Regenerate Button */}
      <button
        type="button"
        onClick={handleRegenerate}
        disabled={loading}
        className="text-sm text-blue-600 hover:underline"
      >
        ✨ {loading ? "Generating..." : "Regenerate Summary with AI"}
      </button>

      {/* Next Button */}
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
