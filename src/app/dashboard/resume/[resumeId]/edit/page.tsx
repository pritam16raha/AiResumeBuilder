"use client";

import ResumeEditForm from "@/components/forms/ResumeEditForm";

export default function EditResumePage({
  params,
}: {
  params: { resumeId: string };
}) {
  return <ResumeEditForm resumeId={params.resumeId} />;
}
