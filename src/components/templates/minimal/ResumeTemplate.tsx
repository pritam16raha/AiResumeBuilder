"use client";

import React from "react";
import { Resume } from "@/types/resume";

export default function MinimalTemplate({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-gray-900 space-y-10 font-sans">
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
          <p className="text-sm leading-relaxed">{resume.summary}</p>
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
          <div className="space-y-1">
            {resume.education.map((edu, index) => (
              <p key={index} className="text-sm">
                {edu.degree}, {edu.institution} ({edu.year})
              </p>
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
              <div key={i}>
                <p className="font-medium text-sm">
                  {exp.role} @ {exp.company} ({exp.year})
                </p>
                <ul className="list-disc list-inside text-sm ml-4">
                  {exp.descriptions.map((desc) => (
                    <li key={desc.id}>{desc.description}</li>
                  ))}
                </ul>
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
                <ul className="list-disc list-inside text-sm ml-4">
                  {proj.descriptions.map((desc) => (
                    <li key={desc.id}>{desc.description}</li>
                  ))}
                </ul>
                <div className="text-sm mt-2 space-y-1">
                  {proj.liveLink && (
                    <p>
                      🔗{" "}
                      <a
                        href={proj.liveLink}
                        className="underline text-blue-600"
                        target="_blank"
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
    </div>
  );
}
