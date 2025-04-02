// src/app/dashboard/resume/[resumeId]/page.tsx

import ResumeClientPage from "@/components/resume/ResumeClientPage";


export default function ResumeDetailsWrapper({
  params,
}: {
  params: { resumeId: string };
}) {
  return <ResumeClientPage resumeId={params.resumeId} />;
}
