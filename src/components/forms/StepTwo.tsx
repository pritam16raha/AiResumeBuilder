"use client";

import { useResumeForm } from "@/context/ResumeFormContext";
import { EducationItem } from "@/types/resume";
import { useState, useEffect } from "react";

type Props = {
  next: () => void;
  prev: () => void;
};

export default function StepTwo({ next, prev }: Props) {
  const { data, updateData } = useResumeForm();
  const [education, setEducation] = useState<EducationItem>({
    degree: "",
    institution: "",
    year: "",
  });

  useEffect(() => {
    if (data.education && data.education.length > 0) {
      setEducation(data.education[0]);
    }
  }, [data.education]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateData({ education: [education] });
    next();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-700">🎓 Education</h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Degree</label>
        <input
          name="degree"
          value={education.degree}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Institution</label>
        <input
          name="institution"
          value={education.institution}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Year</label>
        <input
          name="year"
          value={education.year}
          onChange={handleChange}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="pt-4 flex justify-between">
        <button
          type="button"
          onClick={prev}
          className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </form>
  );
}
