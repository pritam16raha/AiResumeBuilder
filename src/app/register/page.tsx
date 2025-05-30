"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setRegisterError("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("/api/user", {
        type: "register",
        ...form,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("storage"));
      router.push("/resume/builder");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Registration failed. Try again.";
        setRegisterError(message);
      } else {
        setRegisterError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false); // ✅ hide loader
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-md rounded-xl border border-slate-800 shadow-2xl">
        <h1 className="text-2xl font-semibold text-center text-white mb-6">
          👤 Create Your Account
        </h1>
        {registerError && (
          <div className="mb-4 text-sm text-red-400 text-center bg-red-900/40 border border-red-500 rounded p-2">
            {registerError}
          </div>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white mb-2">
              Full Name
            </Label>
            <Input
              name="name"
              type="text"
              placeholder="Your full name"
              onChange={handleChange}
              required
              className="text-white"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-white mb-2">
              Email Address
            </Label>
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="text-white"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-white mb-2">
              Password
            </Label>
            <Input
              name="password"
              type="password"
              placeholder="Create a strong password"
              onChange={handleChange}
              required
              className="text-white"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Spinner /> Creating account...
              </>
            ) : (
              "🚀 Sign Up"
            )}
          </Button>
        </form>

        <p className="text-sm text-center mt-6 text-slate-300">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-blue-400 hover:underline hover:text-blue-500"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
