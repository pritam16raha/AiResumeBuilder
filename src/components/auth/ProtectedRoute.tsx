"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = Cookies.get("token");
    setIsLoading(true);

    if (!token) {
      router.push("/auth");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading)
    return (
      <div className="text-white text-center p-10">
        Checking authentication...
      </div>
    );

  return <>{children}</>;
}
