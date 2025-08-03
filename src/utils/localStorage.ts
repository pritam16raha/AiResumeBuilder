// src/utils/localStorage.ts

import { ResumeFormData } from "@/types/resume";
import Cookies from "js-cookie";

export const saveToLocalStorage = (key: string, value: ResumeFormData) => {
  try {
    const stringified = JSON.stringify(value);
    // localStorage.setItem(key, stringified);
    Cookies.set(key, stringified, { expires: 7 }); // Set cookie to expire in 7 days
    window.dispatchEvent(new Event("storage")); // Dispatch storage event for other tabs
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    // const value = localStorage.getItem(key);
    const value = Cookies.get(key);
    if (!value) return null;
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

export const removeFromLocalStorage = (key: string) => {
  try {
    // localStorage.removeItem(key);
    Cookies.remove(key);
    window.dispatchEvent(new Event("storage")); // Dispatch storage event for other tabs
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};
