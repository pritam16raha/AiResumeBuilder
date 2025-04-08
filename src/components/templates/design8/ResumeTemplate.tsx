"use client";

import { Resume } from "@/types/resume";

const formatDate = (date?: string) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function TemplateFour({ resume }: { resume: Resume }) {
  return (
    <div className="w-[794px] h-[1123px] mx-auto px-6 py-10 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{resume.fullName}</h1>
        <p className="text-sm text-gray-600">
          {resume.email} | {resume.phone}
        </p>
      </div>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-1">Summary</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{resume.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-1">Skills</h2>
          <ul className="flex flex-wrap gap-2">
            {resume.skills.map((skill, index) => (
              <li
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-1">
            Education
          </h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="text-sm text-gray-700 mb-2">
              <p className="font-medium">{edu.degree}</p>
              <p>
                {edu.institution} — {edu.year}
              </p>
              {edu.marks && <p>📊 Marks: {edu.marks}</p>}
              {(edu.startDate || edu.endDate) && (
                <p>
                  📅 {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {resume.experiences?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-1">
            Experience
          </h2>
          {resume.experiences.map((exp, index) => (
            <div key={index} className="mb-3">
              <p className="text-sm font-medium text-gray-800">
                {exp.role} @ {exp.company} ({exp.year})
              </p>
              {(exp.startDate || exp.endDate) && (
                <p className="text-sm text-gray-600">
                  📅 {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                </p>
              )}
              {exp.description && (
                <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                  {exp.description.split("\n").map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-1">Projects</h2>
          {resume.projects.map((proj, index) => (
            <div key={index} className="mb-4">
              <p className="text-sm font-medium text-gray-800">
                {proj.title} — {proj.techStack.join(", ")}
              </p>
              {proj.description && (
                <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                  {proj.description.split("\n").map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              )}
              <div className="text-sm text-blue-600 mt-1 space-x-2">
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
        </section>
      )}

      {/* Dynamic Custom Fields */}
      {(
        [
          { key: "certifications", label: "📜 Certifications" },
          { key: "languages", label: "🌐 Languages" },
          { key: "awards", label: "🏅 Awards" },
          { key: "hobbies", label: "🎯 Hobbies" },
          { key: "references", label: "👥 References" },
        ] as const
      ).map(
        ({ key, label }) =>
          Array.isArray(resume[key]) &&
          resume[key]?.length > 0 && (
            <section key={key} className="mb-6">
              <h2 className="text-lg font-semibold text-blue-600 mb-1">
                {label}
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                {(resume[key] as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )
      )}
    </div>
  );
}
