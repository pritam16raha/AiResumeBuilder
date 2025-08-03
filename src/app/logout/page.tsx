// app/logout/page.tsx

"use client";
import Cookies from "js-cookie";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // ✅ Clear localStorage
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    // ✅ Optional: Clear other session data if needed
    Cookies.remove("token");
    Cookies.remove("user");

    // ✅ Redirect to login page
    router.push("/auth");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-slate-900">
      Logging you out...
    </div>
  );
}
