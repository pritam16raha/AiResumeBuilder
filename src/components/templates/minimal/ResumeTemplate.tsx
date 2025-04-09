"use client";

import { Button } from "@/components/ui/button";
import { Resume } from "@/types/resume";
import { handlePrint } from "@/utils/printSection";

const customFieldKeys = [
  "certifications",
  "languages",
  "awards",
  "hobbies",
  "references",
] as const;

type CustomFieldKey = (typeof customFieldKeys)[number];
type CustomFieldMap = { key: CustomFieldKey; label: string };

export default function MinimalTemplate({ resume }: { resume: Resume }) {
  return (
    <>
      <div
        className="w-[794px] min-h-[1123px] mx-auto py-12 px-6 text-gray-900 space-y-10 font-sans border-2 rounded-lg"
        id="printable-cover-letter"
      >
        {/* Name & Contact */}
        <div>
          <h1 className="text-4xl font-bold">{resume.fullName}</h1>
          <p className="text-sm mt-1">
            {resume.email} • {resume.phone}
          </p>
        </div>

        {/* Summary */}
        {resume.summary && (
          <section>
            <h2 className="text-lg font-semibold mb-1">Summary</h2>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {resume.summary}
            </p>
          </section>
        )}

        {/* Skills */}
        {resume.skills?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-1">Skills</h2>
            <p className="text-sm">{resume.skills.join(" • ")}</p>
          </section>
        )}

        {/* Education */}
        {resume.education?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-1">Education</h2>
            <div className="space-y-2">
              {resume.education.map((edu, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium">
                    {edu.degree}, {edu.institution} ({edu.year})
                  </p>
                  {edu.marks && (
                    <p className="text-xs">📊 Marks: {edu.marks}</p>
                  )}
                  {(edu.startDate || edu.endDate) && (
                    <p className="text-xs text-gray-600">
                      📅 {edu.startDate} – {edu.endDate}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {resume.experiences?.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-1">Experience</h2>
            <div className="space-y-3">
              {resume.experiences.map((exp, i) => (
                <div key={i} className="text-sm">
                  <p className="font-medium">
                    {exp.role} @ {exp.company} ({exp.year})
                  </p>
                  {(exp.startDate || exp.endDate) && (
                    <p className="text-xs text-gray-600">
                      📅 {exp.startDate} – {exp.endDate}
                    </p>
                  )}
                  {exp.description && (
                    <ul className="list-disc list-inside ml-4">
                      {exp.description.split("\n").map((point, idx) => (
                        <li key={idx}>{point}</li>
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
            <h2 className="text-lg font-semibold mb-1">Projects</h2>
            <div className="space-y-4">
              {resume.projects.map((proj, i) => (
                <div key={i}>
                  <p className="font-medium text-sm">{proj.title}</p>
                  <p className="text-sm italic mb-1">
                    {proj.techStack.join(", ")}
                  </p>
                  {proj.description && (
                    <ul className="list-disc list-inside text-sm ml-4">
                      {proj.description.split("\n").map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  )}
                  <div className="text-sm mt-2 space-y-1">
                    {proj.liveLink && (
                      <p>
                        🔗{" "}
                        <a
                          href={proj.liveLink}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Live
                        </a>
                      </p>
                    )}
                    {proj.frontendRepo && (
                      <p>
                        💻{" "}
                        <a
                          href={proj.frontendRepo}
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
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
                          className="underline text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
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

        {/* Custom Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-6">
          {customFieldKeys
            .map(
              (key): CustomFieldMap => ({
                key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
              })
            )
            .map(({ key, label }) => {
              const field = resume[key];
              if (!field || field.length === 0) return null;

              return (
                <section key={key}>
                  <h2 className="text-lg font-semibold text-blue-700 mb-2">
                    {label}
                  </h2>
                  <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                    {field.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </section>
              );
            })}
        </div>
      </div>
      <Button className="flex mx-auto" onClick={handlePrint}>
        Print the resume
      </Button>
    </>
  );
}
