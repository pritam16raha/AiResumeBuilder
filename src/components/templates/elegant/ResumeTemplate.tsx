"use client";

import { Button } from "@/components/ui/button";
import { Resume } from "@/types/resume";
import { handlePrint } from "@/utils/printSection";

const formatDate = (date?: string) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export default function ElegantTemplate({ resume }: { resume: Resume }) {
  return (
    <>
      <div
        className="w-[794px] min-h-[1123px] mx-auto bg-white shadow-lg rounded-md px-8 py-10 text-gray-800 space-y-8"
        id="printable-cover-letter"
      >
        {/* Name & Contact */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">{resume.fullName}</h1>
          <p className="text-sm">
            {resume.email} | {resume.phone}
          </p>
        </div>

        {/* Summary */}
        {resume.summary && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Summary
            </h2>
            <p className="text-sm whitespace-pre-wrap">{resume.summary}</p>
          </div>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">Skills</h2>
            <ul className="flex flex-wrap gap-3 text-sm">
              {resume.skills.map((skill, i) => (
                <li
                  key={i}
                  className="bg-gray-100 px-3 py-1 rounded-full border text-gray-700"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Education
            </h2>
            {resume.education.map((edu, i) => (
              <div key={i} className="text-sm mb-2">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-gray-600">
                  {edu.institution} • {edu.year}
                </p>
                {edu.marks && (
                  <p className="text-xs text-gray-500">📊 Marks: {edu.marks}</p>
                )}
                {(edu.startDate || edu.endDate) && (
                  <p className="text-xs text-gray-500">
                    📅 {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experience */}
        {resume.experiences && resume.experiences.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Experience
            </h2>
            {resume.experiences.map((exp, i) => (
              <div key={i} className="mb-4 text-sm">
                <p className="font-semibold">
                  {exp.role} @ {exp.company}
                </p>
                <p className="text-gray-600">{exp.year}</p>
                {(exp.startDate || exp.endDate) && (
                  <p className="text-xs text-gray-500">
                    📅 {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </p>
                )}
                {exp.description && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {exp.description.split("\n").map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1 mb-2">
              Projects
            </h2>
            {resume.projects.map((proj, i) => (
              <div key={i} className="mb-4 text-sm">
                <p className="font-semibold">{proj.title}</p>
                <p className="text-gray-600 mb-1">
                  Tech Stack: {proj.techStack.join(", ")}
                </p>
                {proj.description && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {proj.description.split("\n").map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                )}
                <div className="mt-1 text-blue-600 space-y-1 text-sm">
                  {proj.liveLink && (
                    <p>
                      🔗 Live:{" "}
                      <a
                        href={proj.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
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
                        rel="noopener noreferrer"
                        className="underline"
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
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {proj.backendRepo}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Sections */}
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
              (resume[key] as string[])?.length > 0 && (
                <section key={key}>
                  <h2 className="text-xl font-semibold text-blue-700 mb-2 border-b pb-1">
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
