// src/app/dashboard/resume/[resumeId]/cover-letter/page.tsx

import CoverLetterClient from "@/components/resume/CoverLetterClient";


export default function CoverLetterPage({
  params,
}: {
  params: { resumeId: string };
}) {
  return <CoverLetterClient resumeId={params.resumeId} />;
}
