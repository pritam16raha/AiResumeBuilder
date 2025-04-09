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

export default function TemplateFive({ resume }: { resume: Resume }) {
  return (
    <>
      <div
        className="w-[794px] min-h-[1123px] mx-auto my-10 bg-white shadow-md rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-3"
        id="printable-cover-letter"
      >
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
                    {edu.marks && (
                      <p className="text-xs">📊 Marks: {edu.marks}</p>
                    )}
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-xs">
                        📅 {formatDate(edu.startDate)} –{" "}
                        {formatDate(edu.endDate)}
                      </p>
                    )}
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
                  {(exp.startDate || exp.endDate) && (
                    <p className="text-xs text-gray-600">
                      📅 {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                    </p>
                  )}
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
      <div className="w-[794px] min-h-[1123px] mx-auto px-6 py-10 bg-white shadow-lg rounded-lg border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {resume.fullName}
          </h1>
          <p className="text-sm text-gray-600">
            {resume.email} | {resume.phone}
          </p>
        </div>

        {/* Summary */}
        {resume.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-blue-600 mb-1">
              Summary
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {resume.summary}
            </p>
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
            <h2 className="text-lg font-semibold text-blue-600 mb-1">
              Projects
            </h2>
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
                  <h2 className="text-lg font-semibold text-blue-600 mb-2 border-b pb-1">
                    {label}
                  </h2>
                  <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                    {(resume[key] as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
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
