"use client";

import React from "react";

export type Resume = {
  fullName: string;
  email: string;
  phone: string;
  summary?: string;
  skills?: string[];
  education?: {
    degree: string;
    institution?: string;
    year: string;
  }[];
  projects?: {
    title: string;
    techStack: string[];
    liveLink?: string;
    frontendRepo?: string;
    backendRepo?: string;
    descriptions: {
      id: string;
      description: string;
    }[];
  }[];
  experiences?: {
    company: string;
    role: string;
    year: string;
    descriptions: {
      id: string;
      description: string;
    }[];
  }[];
};

export default function ResumePreview({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">📄 Resume Details</h1>

      {/* Personal Info */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700">
          👤 Personal Info
        </h2>
        <p>
          <strong>Name:</strong> {resume.fullName}
        </p>
        <p>
          <strong>Email:</strong> {resume.email}
        </p>
        <p>
          <strong>Phone:</strong> {resume.phone}
        </p>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700">📝 Summary</h2>
          <p>{resume.summary}</p>
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700">🛠 Skills</h2>
          <ul className="list-disc list-inside">
            {resume.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700">🎓 Education</h2>
          {resume.education.map((edu, i) => (
            <p key={i}>
              - {edu.degree}, {edu.institution} ({edu.year})
            </p>
          ))}
        </div>
      )}

      {/* Experiences */}
      {resume.experiences && resume.experiences.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700">💼 Experience</h2>
          {resume.experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <p>
                <strong>{exp.role}</strong> @ {exp.company} ({exp.year})
              </p>
              <ul className="list-disc list-inside ml-4">
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
        <div>
          <h2 className="text-xl font-semibold text-gray-700">📁 Projects</h2>
          {resume.projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <p>
                <strong>{proj.title}</strong> ({proj.techStack.join(", ")})
              </p>
              <ul className="list-disc list-inside ml-4">
                {proj.descriptions.map((desc) => (
                  <li key={desc.id}>{desc.description}</li>
                ))}
              </ul>
              {proj.liveLink && (
                <p>
                  🔗 Live:{" "}
                  <a
                    href={proj.liveLink}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {proj.liveLink}
                  </a>
                </p>
              )}
              {proj.frontendRepo && (
                <p>
                  🧑‍💻 Frontend:{" "}
                  <a
                    href={proj.frontendRepo}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {proj.frontendRepo}
                  </a>
                </p>
              )}
              {proj.backendRepo && (
                <p>
                  🧑‍💻 Backend:{" "}
                  <a
                    href={proj.backendRepo}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {proj.backendRepo}
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
