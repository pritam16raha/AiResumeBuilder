"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { ResumeFormData } from "@/types/resume";

export default function MultiStepForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ResumeFormData>({
    userId: "",
    fullName: "",
    email: "",
    phone: "",
    education: [],
    experience: [],
    skills: [],
    summary: "",
    role: "",
    stack: "",
    experienceSummary: "",
    prompt: "",
    projects: [],
    certifications: [],
    languages: [],
    awards: [],
    hobbies: [],
    references: [],
  });

  useEffect(() => {
    // const storedUser = localStorage.getItem("user");
    const storedUser = Cookies.get("user");
    if (!storedUser) return;
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    if (parsedUser?.id) {
      setFormData((prev) => ({ ...prev, userId: parsedUser.id }));
    }
  }, []);

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const updateFormData = (data: Partial<ResumeFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl border">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Build Your Resume
      </h1>
      <div className="text-sm text-gray-500 mb-6 text-center">
        Step {step} of 3
      </div>

      {step === 1 && (
        <StepOne next={next} data={formData} updateFormData={updateFormData} />
      )}
      {step === 2 && (
        <StepTwo
          next={next}
          prev={prev}
          data={formData}
          updateFormData={updateFormData}
        />
      )}
      {step === 3 && <StepThree prev={prev} />}
      {/* data={formData} */}
    </div>
  );
}
