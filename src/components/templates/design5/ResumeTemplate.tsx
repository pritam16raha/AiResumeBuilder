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

export default function Professional1Template({ resume }: { resume: Resume }) {
  return (
    <>
      {" "}
      <div className="w-[794px] min-h-[1123px] mx-auto p-6 bg-white text-gray-900 grid grid-cols-3 gap-6 border border-gray-300 shadow-md rounded-xl" id="printable-cover-letter">
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
                <div key={i} className="text-sm mb-3">
                  <p>
                    {edu.degree}, {edu.institution} ({edu.year})
                  </p>
                  <p>
                    📅 {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </p>
                  {edu.marks && <p>📊 Marks: {edu.marks}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Custom Fields */}
          {Array.isArray(resume.languages) && resume.languages.length > 0 && (
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

          {/* Custom Fields */}
          {resume.certifications && resume.certifications.length > 0 && (
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

          {resume.awards && resume.awards.length > 0 && (
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

          {resume.hobbies && resume.hobbies.length > 0 && (
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

          {resume.references && resume.references.length > 0 && (
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
                  <p className="text-sm text-gray-700 mb-1">
                    📅 {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                  </p>
                  <p className="text-sm mt-1 whitespace-pre-line">
                    {exp.description}
                  </p>
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
                  <p className="text-sm mt-1 whitespace-pre-line">
                    {proj.description}
                  </p>
                  <div className="text-sm mt-1 space-y-1">
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
      <Button className="flex mx-auto" onClick={handlePrint}>
        Print the resume
      </Button>
    </>
  );
}
