"use client";

import { Resume } from "@/types/resume";

export default function TemplateFive({ resume }: { resume: Resume }) {
  return (
    <div className="w-[794px] h-[1123px] mx-auto my-10 bg-white shadow-md rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white p-6 space-y-6 md:col-span-1">
        <div>
          <h1 className="text-2xl font-bold">{resume.fullName}</h1>
          <p className="text-sm">{resume.role || "Professional Candidate"}</p>
        </div>
        <div>
          <p className="text-sm">📧 {resume.email}</p>
          <p className="text-sm">📱 {resume.phone}</p>
        </div>

        {resume.skills?.length > 0 && (
          <div>
            <h2 className="font-semibold text-white border-b border-white mb-2">
              Skills
            </h2>
            <ul className="text-sm space-y-1">
              {resume.skills.map((skill, index) => (
                <li key={index}>✅ {skill}</li>
              ))}
            </ul>
          </div>
        )}

        {resume.education?.length > 0 && (
          <div>
            <h2 className="font-semibold text-white border-b border-white mb-2">
              Education
            </h2>
            <ul className="text-sm space-y-2">
              {resume.education.map((edu, index) => (
                <li key={index}>
                  🎓 {edu.degree}
                  <br />
                  <span className="text-xs">
                    {edu.institution} | {edu.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Dynamic Sidebar Fields */}
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
              <div key={key}>
                <h2 className="font-semibold text-white border-b border-white mb-2">
                  {label}
                </h2>
                <ul className="text-sm space-y-1">
                  {(resume[key] as string[]).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            )
        )}
      </aside>

      {/* Main Content */}
      <main className="p-6 md:col-span-2 space-y-6">
        {/* Summary */}
        {resume.summary && (
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              📝 Summary
            </h2>
            <p className="text-gray-800 text-sm whitespace-pre-wrap">
              {resume.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {resume.experiences?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              💼 Experience
            </h2>
            {resume.experiences.map((exp, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-gray-800">
                  {exp.role} @ {exp.company} ({exp.year})
                </p>
                {exp.description && (
                  <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                    {exp.description.split("\n").map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              📁 Projects
            </h2>
            {resume.projects.map((proj, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-gray-800">
                  {proj.title} —{" "}
                  <span className="text-sm text-gray-500">
                    {proj.techStack.join(", ")}
                  </span>
                </p>
                {proj.description && (
                  <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                    {proj.description.split("\n").map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
                <div className="text-xs text-blue-700 mt-1 space-x-2">
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
      </main>
    </div>
  );
}
