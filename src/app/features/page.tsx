"use client";

import {
  BadgeCheck,
  FileText,
  ShieldCheck,
  Sparkles,
  Wand2,
  Download,
  LayoutTemplate,
} from "lucide-react";

const features = [
  {
    title: "🎯 Multi-Step Resume Builder",
    icon: FileText,
    description:
      "Guide users through a simple, step-by-step resume creation process with dynamic sections like projects, education, and experience.",
  },
  {
    title: "🧠 AI Summary Generator",
    icon: Sparkles,
    description:
      "Generate a professional summary using AI, tailored to your skills, education, and job role.",
  },
  {
    title: "✉️ AI Cover Letter Generator",
    icon: Wand2,
    description:
      "Craft tailored cover letters based on resume data and a job-specific prompt — powered by AI.",
  },
  {
    title: "📂 Resume Template Selection",
    icon: LayoutTemplate,
    description:
      "Choose from modern, classic, minimal, and elegant templates — all professionally designed.",
  },
  {
    title: "🔐 Protected Dashboard",
    icon: ShieldCheck,
    description:
      "Only authenticated users can access their dashboard and manage their resumes securely.",
  },
  {
    title: "📝 Edit Saved Resumes",
    icon: BadgeCheck,
    description:
      "Revisit and update any resume anytime using a fully editable multi-step form.",
  },
  {
    title: "📤 Export as PDF",
    icon: Download,
    description:
      "Download your resume as a PDF in one click, ready for job applications and sharing.",
  },
];

export default function FeaturePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 px-6 py-16">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">🚀 Resume Builder Features</h1>
        <p className="text-lg text-gray-600">
          Everything you need to craft a professional resume powered by AI,
          designed to stand out.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-4">
              <feature.icon className="text-blue-600 w-8 h-8" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
