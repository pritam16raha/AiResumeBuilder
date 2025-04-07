"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEditResumeContext } from "@/context/EditResumeContext";
import { ResumeEditData } from "@/types/resume";

interface Props {
  resumeId: string;
}

const simpleFields = [
  "certifications",
  "languages",
  "awards",
  "hobbies",
  "references",
] as const;

export default function ResumeEditForm({ resumeId }: Props) {
  const router = useRouter();
  const { formData, setFormData, updateField } = useEditResumeContext();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/resume/${resumeId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!formData) {
          const raw = res.data.resume;

          const cleaned: ResumeEditData = {
            ...raw,
            summary: raw.summary || "",
            skills: raw.skills || [],
            certifications: raw.certifications || [],
            languages: raw.languages || [],
            awards: raw.awards || [],
            hobbies: raw.hobbies || [],
            references: raw.references || [],
            education: raw.education || [],
            projects: raw.projects || [],
            experiences: raw.experiences || [],
          };

          setFormData(cleaned);
        }

        setLoading(false);
      } catch (err) {
        setError("Failed to load resume.");
        setLoading(false);
        console.log(err);
      }
    };

    fetchResume();
  }, [resumeId, router, setFormData, formData]);

  const handleSave = async () => {
    if (!formData) return;
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    try {
      setSaving(true);
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/resume/${resumeId}/edit`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaving(false);
      router.push(`/dashboard/resume/${resumeId}`);
    } catch (err) {
      setError("Failed to save changes.");
      setSaving(false);
      console.log(err);
    }
  };

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!formData) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-xl bg-gradient-to-br from-white to-slate-100 shadow-xl space-y-8 border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-indigo-700">
        ✏️ Edit Your Resume
      </h1>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => updateField("fullName", e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className="input-field"
        />
      </div>

      {/* Summary */}
      <div>
        <label className="block font-semibold mb-1 text-indigo-600">
          Professional Summary
        </label>
        <textarea
          placeholder="Write your summary here..."
          value={formData.summary}
          onChange={(e) => updateField("summary", e.target.value)}
          className="input-textarea"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block font-semibold mb-1 text-indigo-600">
          Skills (comma separated)
        </label>
        <input
          type="text"
          placeholder="React, Node.js, MongoDB"
          value={formData.skills.join(", ")}
          onChange={(e) =>
            updateField(
              "skills",
              e.target.value.split(",").map((s) => s.trim())
            )
          }
          className="input-field"
        />
      </div>

      {/* Education */}
      <div>
        <h2 className="section-heading">🎓 Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {formData.education.map((edu, i) => (
            <div key={i} className="bg-white p-3 rounded shadow-sm border">
              <input
                className="input-field mb-2"
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => {
                  const updated = [...formData.education];
                  updated[i].degree = e.target.value;
                  updateField("education", updated);
                }}
              />
              <input
                className="input-field mb-2"
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => {
                  const updated = [...formData.education];
                  updated[i].institution = e.target.value;
                  updateField("education", updated);
                }}
              />
              <input
                className="input-field"
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => {
                  const updated = [...formData.education];
                  updated[i].year = e.target.value;
                  updateField("education", updated);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="section-heading">📁 Projects</h2>
        {formData.projects.map((proj, i) => (
          <div
            key={proj.id}
            className="bg-white p-4 rounded-lg shadow-sm border mb-4 space-y-2"
          >
            <input
              className="input-field"
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => {
                const updated = [...formData.projects];
                updated[i].title = e.target.value;
                updateField("projects", updated);
              }}
            />
            <input
              className="input-field"
              placeholder="Live Link"
              value={proj.liveLink}
              onChange={(e) => {
                const updated = [...formData.projects];
                updated[i].liveLink = e.target.value;
                updateField("projects", updated);
              }}
            />
            <input
              className="input-field"
              placeholder="Frontend Repo"
              value={proj.frontendRepo}
              onChange={(e) => {
                const updated = [...formData.projects];
                updated[i].frontendRepo = e.target.value;
                updateField("projects", updated);
              }}
            />
            <input
              className="input-field"
              placeholder="Backend Repo"
              value={proj.backendRepo}
              onChange={(e) => {
                const updated = [...formData.projects];
                updated[i].backendRepo = e.target.value;
                updateField("projects", updated);
              }}
            />

            {/* ✅ Now using the correct single description */}
            <label className="font-semibold block">Description</label>
            <textarea
              className="input-textarea"
              placeholder="Describe the project..."
              value={proj.description}
              onChange={(e) => {
                const updated = [...formData.projects];
                updated[i].description = e.target.value;
                updateField("projects", updated);
              }}
            />
          </div>
        ))}
      </div>

      {/* Experience */}
      <div>
        <h2 className="section-heading">💼 Experience</h2>
        {formData.experiences.map((exp, i) => (
          <div
            key={exp.id}
            className="bg-white p-4 rounded-lg shadow-sm border mb-4 space-y-2"
          >
            <input
              className="input-field"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const updated = [...formData.experiences];
                updated[i].company = e.target.value;
                updateField("experiences", updated);
              }}
            />
            <input
              className="input-field"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => {
                const updated = [...formData.experiences];
                updated[i].role = e.target.value;
                updateField("experiences", updated);
              }}
            />
            <input
              className="input-field"
              placeholder="Year"
              value={exp.year}
              onChange={(e) => {
                const updated = [...formData.experiences];
                updated[i].year = e.target.value;
                updateField("experiences", updated);
              }}
            />

            {/* ✅ Single Description now */}
            <label className="font-semibold block">Description</label>
            <textarea
              className="input-textarea"
              placeholder="Describe your experience"
              value={exp.description}
              onChange={(e) => {
                const updated = [...formData.experiences];
                updated[i].description = e.target.value;
                updateField("experiences", updated);
              }}
            />
          </div>
        ))}
      </div>

      {/* Custom Fields */}
      {simpleFields.map((key) => (
        <div key={key}>
          <h2 className="section-heading capitalize">{key}</h2>
          {formData[key]?.map((item, i) => (
            <input
              key={i}
              type="text"
              value={item}
              onChange={(e) => {
                const updated = [...formData[key]];
                updated[i] = e.target.value;
                updateField(key, updated);
              }}
              className="input-field mb-2"
              placeholder={`${key.slice(0, -1)}`}
            />
          ))}
        </div>
      ))}

      {/* Save Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg transition"
        >
          {saving ? "Saving..." : "💾 Save Changes"}
        </button>
      </div>
    </div>
  );
}

// 💄 Reusable Tailwind classes
const inputBase =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";
const textareaBase =
  "w-full border border-gray-300 rounded px-3 py-2 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400";

const style = document.createElement("style");
style.innerHTML = `
  .input-field { ${inputBase}; }
  .input-textarea { ${textareaBase}; }
  .section-heading { @apply text-lg font-bold text-indigo-700 mb-2 mt-4; }
`;
document.head.appendChild(style);
