"use client";

import { useEffect, useState } from "react";
import { useResumeForm } from "@/context/ResumeFormContext";
import { EducationItem, ProjectItem } from "@/types/resume";
import axios from "axios";

type Props = {
  next: () => void;
  prev: () => void;
};

export default function StepTwo({ next, prev }: Props) {
  const { data, updateData } = useResumeForm();

  const education = data.education?.[0] || {
    degree: "",
    institution: "",
    year: "",
  };

  const projects = data.projects?.length
    ? data.projects
    : [
        {
          title: "",
          techStack: [],
          description: "",
          liveLink: "",
          frontendRepo: "",
          backendRepo: "",
        },
      ];

  useEffect(() => {
    updateData({ education: [education], projects });
  }, []);

  const handleEduChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedEducation = { ...education, [name]: value };
    updateData({ education: [updatedEducation] });
  };

  const handleProjectChange = (
    index: number,
    field: keyof ProjectItem,
    value: string
  ) => {
    const updated = [...projects];
    if (field === "techStack") {
      updated[index][field] = value.split(",").map((tech) => tech.trim());
    } else {
      updated[index][field] = value;
    }
    updateData({ projects: updated });
  };

  const addProject = () => {
    const newProject: ProjectItem = {
      title: "",
      techStack: [],
      description: "",
      liveLink: "",
      frontendRepo: "",
      backendRepo: "",
    };
    updateData({ projects: [...projects, newProject] });
  };

  const deleteProject = (index: number) => {
    const updated = [...projects];
    updated.splice(index, 1);
    updateData({ projects: updated });
  };

  const generateProjectDescription = async (index: number) => {
    const project = projects[index];

    const rawTechStack = project.techStack as string | string[];

    const techStackArray =
      typeof rawTechStack === "string"
        ? rawTechStack.split(",").map((t) => t.trim())
        : Array.isArray(rawTechStack)
        ? rawTechStack
        : [];

    if (!project.title || techStackArray.length === 0) {
      alert("⚠️ Please enter both Title and Tech Stack.");
      return;
    }

    try {
      const res = await axios.post("/api/ai/generate-project-description", {
        title: project.title,
        techStack: techStackArray,
        prompt: project.customPrompt || "",
      });

      const updated = [...projects];
      updated[index].description = res.data.description;
      updateData({ projects: updated });
    } catch (err) {
      alert("❌ Failed to generate description.");
      console.log(err);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    next();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">🎓 Education</h2>

      {/* Education Fields */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Degree</label>
        <input
          name="degree"
          value={education.degree}
          onChange={handleEduChange}
          className="border px-4 py-2 rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Institution</label>
        <input
          name="institution"
          value={education.institution}
          onChange={handleEduChange}
          className="border px-4 py-2 rounded-md"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Year</label>
        <input
          name="year"
          value={education.year}
          onChange={handleEduChange}
          className="border px-4 py-2 rounded-md"
          required
        />
      </div>

      {/* Project Section */}
      <hr className="my-4" />
      <h2 className="text-xl font-semibold text-gray-700">📁 Projects</h2>

      {projects.map((project, index) => (
        <div
          key={index}
          className="border border-gray-300 p-4 rounded-md space-y-3 relative"
        >
          <button
            type="button"
            onClick={() => deleteProject(index)}
            className="absolute top-2 right-2 text-red-500 hover:underline text-sm"
          >
            🗑 Delete
          </button>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              value={project.title}
              onChange={(e) =>
                handleProjectChange(index, "title", e.target.value)
              }
              className="border px-4 py-2 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Tech Used
            </label>
            <input
              value={project.techStack}
              onChange={(e) =>
                handleProjectChange(index, "techStack", e.target.value)
              }
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
              value={project.customPrompt || ""}
              onChange={(e) =>
                handleProjectChange(index, "customPrompt", e.target.value)
              }
              className="border px-4 py-2 rounded-md"
              placeholder="e.g., emphasize frontend features"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Description / Bullet Points
            </label>
            <textarea
              value={project.description}
              onChange={(e) =>
                handleProjectChange(index, "description", e.target.value)
              }
              className="border px-4 py-2 rounded-md"
              rows={3}
              required
            />
            <button
              type="button"
              onClick={() => generateProjectDescription(index)}
              className="text-sm text-blue-600 hover:underline"
            >
              ✨ Generate Description with AI
            </button>
          </div>

          {/* Optional Links */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Live Link
            </label>
            <input
              value={project.liveLink}
              onChange={(e) =>
                handleProjectChange(index, "liveLink", e.target.value)
              }
              className="border px-4 py-2 rounded-md"
              placeholder="https://your-live-app.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Frontend Repo
            </label>
            <input
              value={project.frontendRepo}
              onChange={(e) =>
                handleProjectChange(index, "frontendRepo", e.target.value)
              }
              className="border px-4 py-2 rounded-md"
              placeholder="https://github.com/user/frontend"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">
              Backend Repo
            </label>
            <input
              value={project.backendRepo}
              onChange={(e) =>
                handleProjectChange(index, "backendRepo", e.target.value)
              }
              className="border px-4 py-2 rounded-md"
              placeholder="https://github.com/user/backend"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="text-sm text-green-600 hover:underline"
      >
        ➕ Add Another Project
      </button>

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
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </form>
  );
}
