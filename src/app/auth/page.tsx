// // SignupSigninPage.tsx
// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { useRouter } from "next/navigation";

// export default function SignupSigninPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/user", {
//         type: "register",
//         ...form,
//       });
//       console.log("Signup Success:", res.data);
//       // Optionally store token: localStorage.setItem("token", res.data.token)
//       // ✅ Store token and user
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       window.dispatchEvent(new Event("storage"));
//     } catch (error) {
//       console.error("Signup Failed:", error);
//     }
//   };

//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/user", {
//         type: "login",
//         email: form.email,
//         password: form.password,
//       });
//       console.log("Login Success:", res.data);

//       // ✅ Store token and user
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       window.dispatchEvent(new Event("storage"));
//       // ✅ Optional: redirect after login
//       router.push("/resume/builder");
//     } catch (error) {
//       console.error("Login Failed:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
//       <Card className="w-full max-w-md shadow-2xl border border-slate-800 bg-white/5 backdrop-blur-md">
//         <CardHeader>
//           <CardTitle className="text-center text-white">
//             Welcome Back 👋
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="login" className="w-full">
//             <TabsList className="grid grid-cols-2 mb-6">
//               <TabsTrigger value="login">Sign In</TabsTrigger>
//               <TabsTrigger value="signup">Sign Up</TabsTrigger>
//             </TabsList>

//             {/* Sign In Tab */}
//             <TabsContent value="login">
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     name="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     onChange={handleChange}
//                     className="text-white"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input
//                     name="password"
//                     type="password"
//                     placeholder="••••••••"
//                     onChange={handleChange}
//                     className="text-white"
//                     required
//                   />
//                 </div>
//                 <Button type="submit" className="w-full mt-4">
//                   Sign In
//                 </Button>
//               </form>
//             </TabsContent>

//             {/* Sign Up Tab */}
//             <TabsContent value="signup">
//               <form onSubmit={handleSignup} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     name="name"
//                     type="text"
//                     placeholder="Your name"
//                     onChange={handleChange}
//                     className="text-white"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     name="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     onChange={handleChange}
//                     className="text-white"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="password">Password</Label>
//                   <Input
//                     name="password"
//                     type="password"
//                     placeholder="Create a password"
//                     onChange={handleChange}
//                     className="text-white"
//                     required
//                   />
//                 </div>
//                 <Button type="submit" className="w-full mt-4">
//                   Sign Up
//                 </Button>
//               </form>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export default function SignupSigninPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user", { type: "register", ...form });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Signup Failed:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user", {
        type: "login",
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("storage"));
      router.push("/resume/builder");
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl rounded-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-white tracking-wide">
            Welcome 👋
          </CardTitle>
          <CardDescription className="text-gray-300 text-sm">
            Sign in to your account or create a new one to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6 bg-white/10 p-1 rounded-lg">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-md transition"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white rounded-md transition"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Sign In */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">Name</Label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-200">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-indigo-400"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
