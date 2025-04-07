"use client";

import { Resume } from "@/types/resume";

export default function TemplateThree({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-white border rounded shadow-md text-gray-800">
      {/* Header */}
      <header className="text-center border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold">{resume.fullName}</h1>
        <p>
          {resume.email} | {resume.phone}
        </p>
      </header>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">📝 Summary</h2>
          <p className="whitespace-pre-wrap">{resume.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">🛠 Skills</h2>
          <ul className="flex flex-wrap gap-2">
            {resume.skills.map((skill, idx) => (
              <li
                key={idx}
                className="px-3 py-1 bg-slate-200 rounded-full text-sm"
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
          <h2 className="text-xl font-semibold border-b mb-2">🎓 Education</h2>
          <ul className="space-y-2">
            {resume.education.map((edu, i) => (
              <li key={i}>
                <strong>{edu.degree}</strong>, {edu.institution} ({edu.year})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Experience */}
      {resume.experiences?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">💼 Experience</h2>
          <div className="space-y-4">
            {resume.experiences.map((exp, i) => (
              <div key={i}>
                <p className="font-semibold">
                  {exp.role} @ {exp.company} ({exp.year})
                </p>
                {exp.description && (
                  <ul className="list-disc list-inside text-sm ml-4">
                    {exp.description.split("\n").map((line, idx) => (
                      <li key={idx}>{line}</li>
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
        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b mb-2">📁 Projects</h2>
          <div className="space-y-6">
            {resume.projects.map((proj, i) => (
              <div key={i}>
                <p className="font-semibold">
                  {proj.title} ({proj.techStack.join(", ")})
                </p>
                {proj.description && (
                  <ul className="list-disc list-inside ml-4 text-sm">
                    {proj.description.split("\n").map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                )}
                <div className="text-sm text-blue-600 mt-1 space-y-1">
                  {proj.liveLink && (
                    <p>
                      🔗{" "}
                      <a href={proj.liveLink} target="_blank" rel="noreferrer">
                        Live
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

      {/* Dynamic Fields */}
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
              <h2 className="text-xl font-semibold border-b mb-2">{label}</h2>
              <ul className="list-disc list-inside text-sm ml-4">
                {(resume[key] as string[]).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )
      )}
    </div>
  );
}
