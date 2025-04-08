"use client";

import React from "react";
import { Resume } from "@/types/resume";

export default function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="w-[794px] h-[1123px] mx-auto bg-white text-gray-800 shadow-xl rounded-md px-10 py-12 space-y-10">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-4xl font-bold">{resume.fullName}</h1>
        <p className="text-sm text-gray-600 mt-1">
          {resume.email} | {resume.phone}
        </p>
      </div>

      {/* Summary */}
      {resume.summary && (
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Summary</h2>
          <p className="text-sm leading-relaxed">{resume.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <span
                key={index}
                className="text-sm border border-gray-300 rounded-full px-3 py-1"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {resume.education.map((edu, index) => (
              <div key={index} className="text-sm">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-gray-600">
                  {edu.institution} • {edu.year}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {resume.experiences?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Experience
          </h2>
          <div className="space-y-4">
            {resume.experiences.map((exp, index) => (
              <div key={index}>
                <p className="font-semibold">
                  {exp.role} @ {exp.company} ({exp.year})
                </p>
                <p className="ml-4 text-sm text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Projects</h2>
          <div className="space-y-4">
            {resume.projects.map((proj, index) => (
              <div key={index}>
                <p className="font-semibold text-base">{proj.title}</p>
                <p className="text-sm text-gray-600 mb-1">
                  Tech Stack: {proj.techStack.join(", ")}
                </p>
                <p className="ml-4 text-sm text-gray-700">{proj.description}</p>
                {/* Links for live and repos */}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {[
        { title: "Certifications", data: resume.certifications },
        { title: "Languages", data: resume.languages },
        { title: "Awards", data: resume.awards },
        { title: "Hobbies", data: resume.hobbies },
        { title: "References", data: resume.references },
      ]
        .filter(({ data }) => Array.isArray(data) && data.length > 0) // ✅ safe filter
        .map(({ title, data }) => (
          <section key={title}>
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              {title}
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
              {data!.map(
                (
                  item,
                  idx // ✅ we now know data is defined
                ) => (
                  <li key={idx}>{item}</li>
                )
              )}
            </ul>
          </section>
        ))}
    </div>
  );
}
