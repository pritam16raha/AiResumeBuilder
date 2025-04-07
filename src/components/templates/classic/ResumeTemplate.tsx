"use client";

import { Resume } from "@/types/resume";

export default function ClassicTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md border border-gray-200">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{resume.fullName}</h1>
        <p className="text-gray-600">
          {resume.email} | {resume.phone}
        </p>
      </header>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">
            Summary
          </h2>
          <p className="text-gray-800 whitespace-pre-wrap">{resume.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">
            Skills
          </h2>
          <ul className="list-disc list-inside text-gray-800">
            {resume.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Custom Sections */}
      {[
        { label: "Certifications", field: resume.certifications },
        { label: "Languages", field: resume.languages },
        { label: "Awards", field: resume.awards },
        { label: "Hobbies", field: resume.hobbies },
        { label: "References", field: resume.references },
      ].map(
        (item) =>
          item.field &&
          item.field.length > 0 && (
            <section key={item.label} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">
                {item.label}
              </h2>
              <ul className="list-disc list-inside text-gray-800">
                {item.field.map((val, i) => (
                  <li key={i}>{val}</li>
                ))}
              </ul>
            </section>
          )
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">
            Education
          </h2>
          {resume.education.map((edu, i) => (
            <p key={i} className="text-gray-800">
              - {edu.degree}, {edu.institution} ({edu.year})
            </p>
          ))}
        </section>
      )}

      {/* Experience */}
      {resume.experiences && resume.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">
            Experience
          </h2>
          {resume.experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium text-gray-800">
                {exp.role} @ {exp.company} ({exp.year})
              </p>
              <p className="ml-4 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-700 border-b pb-1 mb-2">
            Projects
          </h2>
          {resume.projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium text-gray-800">
                {proj.title} ({proj.techStack.join(", ")})
              </p>

              {/* ✅ Corrected */}
              <p className="ml-4 text-gray-700 whitespace-pre-wrap">
                {proj.description}
              </p>

              {proj.liveLink && (
                <p>
                  🔗 Live:{" "}
                  <a
                    href={proj.liveLink}
                    target="_blank"
                    className="text-blue-600 underline"
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
                    target="_blank"
                    className="text-blue-600 underline"
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
                    target="_blank"
                    className="text-blue-600 underline"
                    rel="noopener noreferrer"
                  >
                    {proj.backendRepo}
                  </a>
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
