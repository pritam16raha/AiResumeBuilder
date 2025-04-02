"use client";

import React from "react";
import type { Resume } from "@/types/resume";

export default function Professional1Template({ resume }: { resume: Resume }) {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white text-gray-900 grid grid-cols-3 gap-6 border border-gray-300 shadow-md rounded-xl">
      {/* Left Sidebar */}
      <aside className="col-span-1 space-y-6">
        <div>
          <h2 className="text-lg font-semibold border-b pb-1 border-gray-400 mb-2">
            Contact
          </h2>
          <p>
            <strong>Email:</strong> {resume.email}
          </p>
          <p>
            <strong>Phone:</strong> {resume.phone}
          </p>
        </div>

        {resume.skills?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b pb-1 border-gray-400 mb-2">
              Skills
            </h2>
            <ul className="list-disc list-inside text-sm">
              {resume.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        )}

        {resume.education?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b pb-1 border-gray-400 mb-2">
              Education
            </h2>
            {resume.education.map((edu, i) => (
              <p key={i} className="text-sm">
                {edu.degree}, {edu.institution} ({edu.year})
              </p>
            ))}
          </div>
        )}

        {/* Custom Fields */}
        {resume.certifications?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b pb-1 border-gray-400 mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-sm">
              {resume.certifications.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {resume.languages?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b pb-1 border-gray-400 mb-2">
              Languages
            </h2>
            <ul className="list-disc list-inside text-sm">
              {resume.languages.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {resume.awards?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b pb-1 border-gray-400 mb-2">
              Awards
            </h2>
            <ul className="list-disc list-inside text-sm">
              {resume.awards.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {resume.hobbies?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b pb-1 border-gray-400 mb-2">
              Hobbies
            </h2>
            <ul className="list-disc list-inside text-sm">
              {resume.hobbies.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {resume.references?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b pb-1 border-gray-400 mb-2">
              References
            </h2>
            <ul className="list-disc list-inside text-sm">
              {resume.references.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Right Main Content */}
      <section className="col-span-2 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {resume.fullName}
          </h1>
        </div>

        {resume.summary && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1 border-gray-400 mb-2">
              Summary
            </h2>
            <p className="text-sm leading-relaxed">{resume.summary}</p>
          </div>
        )}

        {resume.experiences?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1 border-gray-400 mb-2">
              Experience
            </h2>
            {resume.experiences.map((exp, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold">
                  {exp.role} @ {exp.company} ({exp.year})
                </p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  {exp.descriptions.map((desc) => (
                    <li key={desc.id}>{desc.description}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {resume.projects?.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold border-b pb-1 border-gray-400 mb-2">
              Projects
            </h2>
            {resume.projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold">
                  {proj.title}{" "}
                  <span className="text-gray-600 text-sm">
                    ({proj.techStack.join(", ")})
                  </span>
                </p>
                <ul className="list-disc list-inside ml-4 text-sm">
                  {proj.descriptions.map((desc) => (
                    <li key={desc.id}>{desc.description}</li>
                  ))}
                </ul>
                <div className="text-sm mt-1">
                  {proj.liveLink && (
                    <p>
                      🔗 Live:{" "}
                      <a
                        href={proj.liveLink}
                        className="text-blue-600 underline"
                        target="_blank"
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
                        className="text-blue-600 underline"
                        target="_blank"
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
                        className="text-blue-600 underline"
                        target="_blank"
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
      </section>
    </div>
  );
}
