"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEditResumeContext } from "@/context/EditResumeContext";
import { ResumeEditData } from "@/types/resume";

interface Props {
  resumeId: string;
}

type SimpleArrayField =
  | "certifications"
  | "languages"
  | "awards"
  | "hobbies"
  | "references";

const simpleFields: SimpleArrayField[] = [
  "certifications",
  "languages",
  "awards",
  "hobbies",
  "references",
];

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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!formData) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Resume</h1>

      <div className="grid gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName || ""}
          onChange={(e) => updateField("fullName", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={(e) => updateField("email", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone || ""}
          onChange={(e) => updateField("phone", e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Summary"
          value={formData.summary || ""}
          onChange={(e) => updateField("summary", e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={
            Array.isArray(formData.skills) ? formData.skills.join(", ") : ""
          }
          onChange={(e) =>
            updateField(
              "skills",
              e.target.value.split(",").map((s) => s.trim())
            )
          }
          className="border p-2 rounded"
        />

        {formData.education?.map((edu, index) => (
          <div key={index} className="border p-2 rounded">
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const updated = [...formData.education!];
                updated[index].degree = e.target.value;
                updateField("education", updated);
              }}
              className="mb-1 w-full"
            />
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => {
                const updated = [...formData.education!];
                updated[index].institution = e.target.value;
                updateField("education", updated);
              }}
              className="mb-1 w-full"
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => {
                const updated = [...formData.education!];
                updated[index].year = e.target.value;
                updateField("education", updated);
              }}
              className="w-full"
            />
          </div>
        ))}

        {simpleFields.map((key) => (
          <div key={key} className="border p-2 rounded">
            <label className="block font-semibold mb-1 capitalize">{key}</label>
            {formData[key]?.map((val: string, index: number) => (
              <input
                key={index}
                type="text"
                value={val}
                onChange={(e) => {
                  const updated = [...formData[key]!];
                  updated[index] = e.target.value;
                  updateField(key, updated);
                }}
                className="mb-1 w-full"
                placeholder={key.slice(0, -1)}
              />
            ))}
          </div>
        ))}

        {formData.projects?.map((proj, index) => (
          <div key={index} className="border p-2 rounded">
            <input
              className="mb-1 w-full"
              type="text"
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => {
                const updated = [...formData.projects!];
                updated[index].title = e.target.value;
                updateField("projects", updated);
              }}
            />
            <input
              className="mb-1 w-full"
              type="text"
              placeholder="Live Link"
              value={proj.liveLink}
              onChange={(e) => {
                const updated = [...formData.projects!];
                updated[index].liveLink = e.target.value;
                updateField("projects", updated);
              }}
            />
            <input
              className="mb-1 w-full"
              type="text"
              placeholder="Frontend Repo"
              value={proj.frontendRepo}
              onChange={(e) => {
                const updated = [...formData.projects!];
                updated[index].frontendRepo = e.target.value;
                updateField("projects", updated);
              }}
            />
            <input
              className="mb-1 w-full"
              type="text"
              placeholder="Backend Repo"
              value={proj.backendRepo}
              onChange={(e) => {
                const updated = [...formData.projects!];
                updated[index].backendRepo = e.target.value;
                updateField("projects", updated);
              }}
            />
            <label className="font-semibold block">Descriptions</label>
            {proj.descriptions?.map((desc, i) => (
              <textarea
                key={i}
                className="mb-1 w-full"
                placeholder="Description"
                value={desc.description}
                onChange={(e) => {
                  const updated = [...formData.projects!];
                  updated[index].descriptions[i].description = e.target.value;
                  updateField("projects", updated);
                }}
              />
            ))}
          </div>
        ))}

        {formData.experiences?.map((exp, index) => (
          <div key={index} className="border p-2 rounded">
            <input
              className="mb-1 w-full"
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => {
                const updated = [...formData.experiences!];
                updated[index].company = e.target.value;
                updateField("experiences", updated);
              }}
            />
            <input
              className="mb-1 w-full"
              type="text"
              placeholder="Role"
              value={exp.role}
              onChange={(e) => {
                const updated = [...formData.experiences!];
                updated[index].role = e.target.value;
                updateField("experiences", updated);
              }}
            />
            <input
              className="mb-1 w-full"
              type="text"
              placeholder="Year"
              value={exp.year}
              onChange={(e) => {
                const updated = [...formData.experiences!];
                updated[index].year = e.target.value;
                updateField("experiences", updated);
              }}
            />
            <label className="font-semibold block">Descriptions</label>
            {exp.descriptions?.map((desc, i) => (
              <textarea
                key={i}
                className="mb-1 w-full"
                placeholder="Description"
                value={desc.description}
                onChange={(e) => {
                  const updated = [...formData.experiences!];
                  updated[index].descriptions[i].description = e.target.value;
                  updateField("experiences", updated);
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "💾 Save Changes"}
        </button>
      </div>
    </div>
  );
}
