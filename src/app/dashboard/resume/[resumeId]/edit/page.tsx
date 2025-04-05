import ResumeEditForm from "@/components/forms/ResumeEditForm";
import { EditResumeProvider } from "@/context/EditResumeContext";


export default function EditResumePage({
  params,
}: {
  params: { resumeId: string };
}) {
  return (
    <EditResumeProvider>
      <ResumeEditForm resumeId={params.resumeId} />
    </EditResumeProvider>
  );
}
