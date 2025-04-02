// src/components/templates/TemplateSelector.tsx
"use client";

import { ResumeTemplate, availableTemplates } from "@/types/templates";

export default function TemplateSelector({
  selected,
  onSelect,
}: {
  selected: ResumeTemplate;
  onSelect: (template: ResumeTemplate) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(availableTemplates).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onSelect(key as ResumeTemplate)}
          className={`border p-4 rounded ${
            selected === key ? "border-blue-600" : "border-gray-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
