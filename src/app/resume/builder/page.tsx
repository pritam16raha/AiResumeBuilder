import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MultiStepForm from "@/components/forms/MultiStepForm";
import { ResumeFormProvider } from "@/context/ResumeFormContext";

export default function ResumeBuilderPage() {
  return (
    <ResumeFormProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <h1 className="text-3xl font-bold text-center mt-10">
            Build Your Resume
          </h1>
          <MultiStepForm />
        </div>
      </ProtectedRoute>
    </ResumeFormProvider>
  );
}
