"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useResumeForm } from "@/context/ResumeFormContext";
import { ExperienceItem } from "@/types/resume";

type Props = {
  prev: () => void;
};

export default function StepThree({ prev }: Props) {
  const { data, updateData, clearData } = useResumeForm();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [year, setYear] = useState("");

  // ✅ Pre-fill on first render
  useEffect(() => {
    if (data.experience.length > 0) {
      const { company, role, year } = data.experience[0];
      setCompany(company);
      setRole(role);
      setYear(year);
    }
  }, []);

  // ✅ Avoid infinite update loop
  useEffect(() => {
    const existing = data.experience[0] || {};
    if (
      company !== existing.company ||
      role !== existing.role ||
      year !== existing.year
    ) {
      updateData({ experience: [{ company, role, year }] });
    }
  }, [company, role, year]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...data,
      experience: [{ company, role, year }],
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("❌ Unauthorized. Please login first.");
        return;
      }

      const res = await axios.post("/api/save-resume", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        alert("🎉 Resume saved successfully!");
        clearData();
        // router.push("/resume/preview")
      } else {
        alert("❌ Something went wrong!");
      }
    } catch (err) {
      console.error("Resume Save Failed:", err);
      alert("❌ Failed to save resume.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold text-gray-700">💼 Experience</h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Company</label>
        <input
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Role</label>
        <input
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">Year</label>
        <input
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
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
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ✅ Submit
        </button>
      </div>
    </form>
  );
}
