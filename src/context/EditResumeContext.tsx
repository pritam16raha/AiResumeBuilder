"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ResumeEditData } from "@/types/resume"; // ✅ Only use ResumeEditData

type EditResumeContextType = {
  formData: ResumeEditData | null;
  setFormData: (data: ResumeEditData) => void;
  updateField: <K extends keyof ResumeEditData>(
    field: K,
    value: ResumeEditData[K]
  ) => void;
  resetForm: () => void;
};

const EditResumeContext = createContext<EditResumeContextType | undefined>(
  undefined
);

export const EditResumeProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState<ResumeEditData | null>(null); // ✅ FIXED

  const setFormData = (data: ResumeEditData) => {
    setFormDataState(data);
  };

  const updateField = <K extends keyof ResumeEditData>(
    field: K,
    value: ResumeEditData[K]
  ) => {
    setFormDataState((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const resetForm = () => {
    setFormDataState(null);
  };

  return (
    <EditResumeContext.Provider
      value={{ formData, setFormData, updateField, resetForm }}
    >
      {children}
    </EditResumeContext.Provider>
  );
};

export const useEditResumeContext = () => {
  const context = useContext(EditResumeContext);
  if (!context) {
    throw new Error(
      "useEditResumeContext must be used within an EditResumeProvider"
    );
  }
  return context;
};
