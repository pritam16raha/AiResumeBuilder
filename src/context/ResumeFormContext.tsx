// src/context/ResumeFormContext.tsx
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ResumeFormData } from "@/types/resume";
import {
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
} from "@/utils/localStorage";

const STORAGE_KEY = "resumeData";

const defaultData: ResumeFormData = {
  userId: "",
  fullName: "",
  email: "",
  phone: "",
  summary: "",
  skills: [],
  education: [],
  experience: [],
};

type ResumeFormContextType = {
  data: ResumeFormData;
  updateData: (updates: Partial<ResumeFormData>) => void;
  clearData: () => void;
};

const ResumeFormContext = createContext<ResumeFormContextType>({
  data: defaultData,
  updateData: () => {},
  clearData: () => {},
});

export const ResumeFormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ResumeFormData>(defaultData);

  // ✅ Load data from localStorage on mount
  useEffect(() => {
    const storedData = getFromLocalStorage(STORAGE_KEY);
    if (storedData) {
      setData(storedData);
    }
  }, []);

  // ✅ Save updated data to localStorage
  const updateData = (updates: Partial<ResumeFormData>) => {
    const updatedData = { ...data, ...updates };
    setData(updatedData);
    saveToLocalStorage(STORAGE_KEY, updatedData);
  };

  // ✅ Clear both state and localStorage
  const clearData = () => {
    setData(defaultData);
    removeFromLocalStorage(STORAGE_KEY);
  };

  return (
    <ResumeFormContext.Provider value={{ data, updateData, clearData }}>
      {children}
    </ResumeFormContext.Provider>
  );
};

export const useResumeForm = () => useContext(ResumeFormContext);
