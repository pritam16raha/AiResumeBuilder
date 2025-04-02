"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useResumeForm } from "@/context/ResumeFormContext";
import { ExperienceFormItem, ExperienceItem } from "@/types/resume";
import transformToExperienceItem from "@/utils/transform";

type Props = {
  prev: () => void;
};

export default function StepThree({ prev }: Props) {
  const { data, updateData, clearData } = useResumeForm();

  const [experiences, setExperiences] = useState<ExperienceFormItem[]>(
    data.experience?.length
      ? (data.experience as ExperienceFormItem[])
      : [
          {
            company: "",
            role: "",
            year: "",
            customPrompt: "",
            descriptions: [{ description: "" }],
          },
        ]
  );

  const [isFresher, setIsFresher] = useState(data.experience.length === 0);

  useEffect(() => {
    if (isFresher) {
      updateData({ experience: [] });
    } else {
      const transformed: ExperienceItem[] = experiences.map(
        transformToExperienceItem
      );
      updateData({ experience: transformed });
    }
  }, [experiences, isFresher]);

  type ExperienceStringField = "company" | "role" | "year" | "customPrompt";

  const handleChange = (
    index: number,
    field: ExperienceStringField,
    value: string
  ) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        company: "",
        role: "",
        year: "",
        customPrompt: "",
        descriptions: [
          {
            description: "",
          },
        ],
      },
    ]);
  };

  const deleteExperience = (index: number) => {
    const updated = [...experiences];
    updated.splice(index, 1);
    setExperiences(updated);
  };

  const generateDescription = async (index: number) => {
    const exp = experiences[index];
    if (!exp.company || !exp.role || !exp.year) {
      alert("⚠️ Fill Company, Role, and Year first.");
      return;
    }

    try {
      const res = await axios.post("/api/ai/generate-experience-description", {
        company: exp.company,
        role: exp.role,
        year: exp.year,
        prompt: exp.customPrompt || "",
      });

      const updated = [...experiences];
      updated[index].descriptions = [
        {
          description: res.data.description,
        },
      ];
      setExperiences(updated);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to generate description");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...data,
      experience: isFresher ? [] : experiences,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ Unauthorized. Please login first.");
        return;
      }

      const res = await axios.post("/api/save-resume", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        alert("🎉 Resume saved successfully!");
        clearData();
      } else {
        alert("❌ Something went wrong!");
      }
    } catch (err) {
      console.error("Resume Save Failed:", err);
      alert("❌ Failed to save resume.");
    }
  };

  const handleDescriptionChange = (
    expIndex: number,
    descIndex: number,
    value: string
  ) => {
    const updated = [...experiences];
    if (!updated[expIndex].descriptions[descIndex]) return;

    updated[expIndex].descriptions[descIndex].description = value;
    setExperiences(updated);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isFresher"
          checked={isFresher}
          onChange={(e) => setIsFresher(e.target.checked)}
        />
        <label htmlFor="isFresher" className="text-sm text-gray-700">
          I&apos;m a Fresher (No experience)
        </label>
      </div>

      {!isFresher &&
        experiences.map((exp, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 rounded-md space-y-3 relative"
          >
            <button
              type="button"
              onClick={() => deleteExperience(index)}
              className="absolute top-2 right-2 text-red-500 hover:underline text-sm"
            >
              🗑 Delete
            </button>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Company
              </label>
              <input
                value={exp.company}
                onChange={(e) => handleChange(index, "company", e.target.value)}
                className="border px-4 py-2 rounded-md"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Role</label>
              <input
                value={exp.role}
                onChange={(e) => handleChange(index, "role", e.target.value)}
                className="border px-4 py-2 rounded-md"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Year</label>
              <input
                value={exp.year}
                onChange={(e) => handleChange(index, "year", e.target.value)}
                className="border px-4 py-2 rounded-md"
                required
              />
            </div>

            {/* Optional Prompt */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Optional Prompt (to guide AI)
              </label>
              <input
                value={exp.customPrompt || ""}
                onChange={(e) =>
                  handleChange(index, "customPrompt", e.target.value)
                }
                className="border px-4 py-2 rounded-md"
                placeholder="e.g., highlight team leadership"
              />
            </div>

            {exp.descriptions?.length > 0 && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-600">
                  Description / Bullet Points
                </label>
                <textarea
                  value={exp.descriptions[0].description}
                  onChange={(e) =>
                    handleDescriptionChange(index, 0, e.target.value)
                  }
                  className="border px-4 py-2 rounded-md"
                  rows={3}
                />
                <button
                  type="button"
                  onClick={() => generateDescription(index)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ✨ Generate Description with AI
                </button>
              </div>
            )}
          </div>
        ))}

      {!isFresher && (
        <button
          type="button"
          onClick={addExperience}
          className="text-sm text-green-600 hover:underline"
        >
          ➕ Add Another Experience
        </button>
      )}

      <div className="pt-6 flex justify-between">
        <button
          type="button"
          onClick={prev}
          className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ✅ Submit
        </button>
      </div>
    </form>
  );
}
