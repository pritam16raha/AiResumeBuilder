"use client";

import React from "react";
import type { Resume } from "@/types/resume";

export default function TemplateSix({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
      {/* Header */}
      <div className="text-center mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">{resume.fullName}</h1>
        <p className="text-gray-500">
          {resume.role || "Aspiring Professional"}
        </p>
        <div className="mt-2 text-sm text-gray-600">
          <p>📧 {resume.email}</p>
          <p>📱 {resume.phone}</p>
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">
            ✨ Summary
          </h2>
          <p className="text-gray-700 text-sm">{resume.summary}</p>
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">
            🛠 Skills
          </h2>
          <ul className="flex flex-wrap gap-2 text-sm text-gray-700">
            {resume.skills.map((skill, idx) => (
              <li key={idx} className="bg-purple-100 px-3 py-1 rounded-full">
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">
            🎓 Education
          </h2>
          <ul className="text-sm space-y-2 text-gray-800">
            {resume.education.map((edu, i) => (
              <li key={i}>
                <strong>{edu.degree}</strong> — {edu.institution} ({edu.year})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {resume.experiences && resume.experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">
            💼 Experience
          </h2>
          {resume.experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium text-gray-800">
                {exp.role} @ {exp.company} ({exp.year})
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                {exp.descriptions.map((desc) => (
                  <li key={desc.id}>{desc.description}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">
            📁 Projects
          </h2>
          {resume.projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium text-gray-800">
                {proj.title} —{" "}
                <span className="text-sm text-gray-500">
                  {proj.techStack.join(", ")}
                </span>
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                {proj.descriptions.map((desc) => (
                  <li key={desc.id}>{desc.description}</li>
                ))}
              </ul>

              <div className="text-xs mt-1 space-x-3 text-blue-600">
                {proj.liveLink && (
                  <a
                    href={proj.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🌐 Live
                  </a>
                )}
                {proj.frontendRepo && (
                  <a
                    href={proj.frontendRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💻 Frontend
                  </a>
                )}
                {proj.backendRepo && (
                  <a
                    href={proj.backendRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔧 Backend
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
