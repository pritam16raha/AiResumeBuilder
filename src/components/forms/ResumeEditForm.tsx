// src/app/dashboard/resume/[resumeId]/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ExperienceItem, Project, Resume } from "@/types/resume";

type ResumeEditFormProps = {
  resumeId: string;
};

export default function EditResumePage({resumeId}: ResumeEditFormProps) {
//   const { resumeId } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/resume/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(res.data.resume);
      setLoading(false);
    };

    fetchData();
  }, [resumeId]);

  const handleInputChange = <K extends keyof Resume>(
    field: K,
    value: Resume[K]
  ) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleArrayChange = (field: keyof Resume, value: string) => {
    handleInputChange(
      field,
      value.split(",").map((v) => v.trim())
    );
  };

  const handleProjectChange = <K extends keyof Project>(
    index: number,
    key: K,
    value: Project[K]
  ) => {
    if (!formData) return; // ✅ guard

    const updated = [...formData.projects];
    updated[index][key] = value;
    setFormData({ ...formData, projects: updated });
  };

  const handleExperienceChange = <K extends keyof ExperienceItem>(
    index: number,
    key: K,
    value: ExperienceItem[K]
  ) => {
    if (!formData) return;
    const updated = [...formData.experiences];
    updated[index][key] = value;
    setFormData({ ...formData, experiences: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/api/resume/${resumeId}/edit`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Resume updated successfully");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update resume");
    }
  };

  function hasDescriptions(
    exp: ExperienceItem | (ExperienceItem & { descriptions?: unknown })
  ): exp is ExperienceItem & { descriptions: { description: string }[] } {
    return (
      typeof exp === "object" &&
      exp !== null &&
      "descriptions" in exp &&
      Array.isArray((exp as { descriptions?: unknown }).descriptions) &&
      (exp as { descriptions: unknown[] }).descriptions.every(
        (d) =>
          typeof d === "object" &&
          d !== null &&
          "description" in d &&
          typeof (d as { description: unknown }).description === "string"
      )
    );
  }


  if (loading || !formData) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto px-4 py-8 space-y-6"
    >
      <h1 className="text-2xl font-bold">📝 Edit Resume</h1>

      <input
        type="text"
        value={formData.fullName || ""}
        onChange={(e) => handleInputChange("fullName", e.target.value)}
        className="w-full p-2 border"
        placeholder="Full Name"
      />
      <input
        type="email"
        value={formData.email || ""}
        onChange={(e) => handleInputChange("email", e.target.value)}
        className="w-full p-2 border"
        placeholder="Email"
      />
      <input
        type="text"
        value={formData.phone || ""}
        onChange={(e) => handleInputChange("phone", e.target.value)}
        className="w-full p-2 border"
        placeholder="Phone"
      />
      <textarea
        value={formData.summary || ""}
        onChange={(e) => handleInputChange("summary", e.target.value)}
        className="w-full p-2 border"
        rows={4}
        placeholder="Summary"
      />

      <textarea
        value={formData.skills?.join(", ") || ""}
        onChange={(e) => handleArrayChange("skills", e.target.value)}
        className="w-full p-2 border"
        placeholder="Comma-separated skills"
      />

      <div>
        <h2 className="font-semibold text-lg">📁 Projects</h2>
        {formData.projects?.map((proj: Project, index: number) => (
          <div key={proj.id} className="border p-4 mt-4 rounded">
            <input
              value={proj.title || ""}
              onChange={(e) =>
                handleProjectChange(index, "title", e.target.value)
              }
              placeholder="Project Title"
              className="w-full p-2 border mb-2"
            />
            <input
              value={proj.techStack?.join(", ") || ""}
              onChange={(e) =>
                handleProjectChange(
                  index,
                  "techStack",
                  e.target.value.split(",").map((v) => v.trim())
                )
              }
              placeholder="Tech Stack"
              className="w-full p-2 border mb-2"
            />
            <textarea
              value={proj.descriptions?.[0]?.description || ""}
              onChange={(e) => {
                const newDescriptions = [...proj.descriptions];
                newDescriptions[0] = {
                  ...newDescriptions[0],
                  description: e.target.value,
                };
                handleProjectChange(index, "descriptions", newDescriptions);
              }}
              className="w-full p-2 border"
              placeholder="Project Description"
            />
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-semibold text-lg">💼 Experiences</h2>
        {formData.experiences?.map((exp: ExperienceItem, index: number) => (
          <div
            key={`${exp.company}-${index}`}
            className="border p-4 mt-4 rounded"
          >
            <input
              value={exp.company || ""}
              onChange={(e) =>
                handleExperienceChange(index, "company", e.target.value)
              }
              placeholder="Company"
              className="w-full p-2 border mb-2"
            />
            <input
              value={exp.role || ""}
              onChange={(e) =>
                handleExperienceChange(index, "role", e.target.value)
              }
              placeholder="Role"
              className="w-full p-2 border mb-2"
            />
            <input
              value={exp.year || ""}
              onChange={(e) =>
                handleExperienceChange(index, "year", e.target.value)
              }
              placeholder="Year"
              className="w-full p-2 border mb-2"
            />
            {/* <textarea
              value={exp.description || ""}
              onChange={(e) =>
                handleExperienceChange(index, "description", e.target.value)
              }
              className="w-full p-2 border"
              placeholder="Experience Description"
            /> */}
            {/* <textarea
              value={exp.descriptions?.[0]?.description || ""}
              onChange={(e) => {
                const updatedExperiences = [...formData.experiences];
                const current = updatedExperiences[index];

                if (
                  !current.descriptions ||
                  current.descriptions.length === 0
                ) {
                  current.descriptions = [{ description: "" }];
                }

                current.descriptions[0].description = e.target.value;

                setFormData({ ...formData, experiences: updatedExperiences });
              }}
              className="w-full p-2 border"
              placeholder="Experience Description"
            /> */}

            <textarea
              value={
                hasDescriptions(exp)
                  ? exp.descriptions[0]?.description || ""
                  : exp.description || ""
              }
              onChange={(e) => {
                const updatedExperiences = [...formData.experiences];

                if (hasDescriptions(updatedExperiences[index])) {
                  const current = updatedExperiences[index];

                  if (
                    !current.descriptions ||
                    current.descriptions.length === 0
                  ) {
                    current.descriptions = [{ description: "" }];
                  }

                  current.descriptions[0].description = e.target.value;
                } else {
                  updatedExperiences[index].description = e.target.value;
                }

                setFormData({ ...formData, experiences: updatedExperiences });
              }}
              className="w-full p-2 border"
              placeholder="Experience Description"
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        💾 Save Changes
      </button>
    </form>
  );
}
