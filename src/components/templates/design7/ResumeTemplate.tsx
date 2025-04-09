"use client";

import { Button } from "@/components/ui/button";
import { Resume } from "@/types/resume";
import { handlePrint } from "@/utils/printSection";

const formatDate = (date?: string) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function TemplateThree({ resume }: { resume: Resume }) {
  return (
    <>
      <div
        className="w-[794px] min-h-[1123px] mx-auto p-8 bg-white border rounded shadow-md text-gray-800"
        id="printable-cover-letter"
      >
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
            <h2 className="text-xl font-semibold border-b mb-2">
              🎓 Education
            </h2>
            <ul className="space-y-4">
              {resume.education.map((edu, i) => (
                <li key={i}>
                  <p>
                    <strong>{edu.degree}</strong>, {edu.institution} ({edu.year}
                    )
                  </p>
                  <p className="text-sm text-gray-600">
                    📅 {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </p>
                  {edu.marks && (
                    <p className="text-sm text-gray-600">
                      📊 Marks: {edu.marks}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Experience */}
        {resume.experiences?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b mb-2">
              💼 Experience
            </h2>
            <div className="space-y-6">
              {resume.experiences.map((exp, i) => (
                <div key={i}>
                  <p className="font-semibold">
                    {exp.role} @ {exp.company} ({exp.year})
                  </p>
                  <p className="text-sm text-gray-600">
                    📅 {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </p>
                  {exp.description && (
                    <ul className="list-disc list-inside text-sm ml-4 mt-1">
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
                        <a
                          href={proj.liveLink}
                          target="_blank"
                          rel="noreferrer"
                        >
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
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
                <section key={key}>
                  <h2 className="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">
                    {label}
                  </h2>
                  <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                    {(resume[key] as string[]).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </section>
              )
          )}
        </div>
      </div>
      <Button className="flex mx-auto" onClick={handlePrint}>
        Print the resume
      </Button>
    </>
  );
}
