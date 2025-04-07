"use client";

import { Resume } from "@/types/resume";

export default function ModernSidebarResume({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-4 gap-6 p-8 bg-white shadow-lg border rounded-lg">
      {/* Sidebar */}
      <aside className="col-span-1 bg-slate-100 p-4 rounded-lg space-y-4">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">👤 Info</h2>
          <p className="mt-2">
            <strong>{resume.fullName}</strong>
          </p>
          <p>{resume.email}</p>
          <p>{resume.phone}</p>
        </div>

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800">🛠 Skills</h2>
            <ul className="list-disc list-inside text-sm mt-2">
              {resume.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
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
              <div key={key}>
                <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
                <ul className="list-disc list-inside text-sm mt-2">
                  {(resume[key] as string[]).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )
        )}
      </aside>

      {/* Main Content */}
      <main className="col-span-3 space-y-6">
        {/* Summary */}
        {resume.summary && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800">📝 Summary</h2>
            <p className="text-gray-700 mt-2 whitespace-pre-wrap">
              {resume.summary}
            </p>
          </section>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              🎓 Education
            </h2>
            <ul className="space-y-2 mt-2">
              {resume.education.map((edu, i) => (
                <li key={i}>
                  <p>
                    <strong>{edu.degree}</strong> — {edu.institution} (
                    {edu.year})
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Experience */}
        {resume.experiences?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800">
              💼 Experience
            </h2>
            <div className="space-y-4 mt-2">
              {resume.experiences.map((exp, idx) => (
                <div key={idx}>
                  <p>
                    <strong>{exp.role}</strong> @ {exp.company} ({exp.year})
                  </p>
                  {exp.description && (
                    <ul className="list-disc list-inside ml-4 text-sm text-gray-600">
                      {exp.description.split("\n").map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resume.projects?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800">📁 Projects</h2>
            <div className="space-y-4 mt-2">
              {resume.projects.map((proj, i) => (
                <div key={i}>
                  <p>
                    <strong>{proj.title}</strong> ({proj.techStack.join(", ")})
                  </p>
                  {proj.descriptions && (
                    <ul className="list-disc list-inside ml-4 text-sm text-gray-600">
                      {proj.descriptions.split("\n").map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  )}
                  <div className="text-sm text-blue-600 mt-1 space-y-1">
                    {proj.liveLink && (
                      <p>
                        🔗{" "}
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live Link
                        </a>
                      </p>
                    )}
                    {proj.frontendRepo && (
                      <p>
                        🧑‍💻{" "}
                        <a
                          href={proj.frontendRepo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Frontend Repo
                        </a>
                      </p>
                    )}
                    {proj.backendRepo && (
                      <p>
                        🔧{" "}
                        <a
                          href={proj.backendRepo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Backend Repo
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
