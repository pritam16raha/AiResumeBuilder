"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaMagic, FaDownload, FaPenNib } from "react-icons/fa";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-100 px-6 py-16 text-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Build Your Resume with <span className="text-blue-600">AI Magic</span>
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Create beautiful, job-ready resumes in minutes. Let AI craft your
          summary, generate bullet points, and personalize your cover letter
          effortlessly.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <FaMagic className="mr-2" /> Get Started for Free
          </Button>
        </Link>
      </motion.div>

      {/* Features Section */}
      <section className="mt-20 grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-md text-left"
        >
          <FaPenNib className="text-3xl text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Smart Summary</h3>
          <p className="text-gray-600 text-sm">
            Generate professional summaries based on your experience and career
            goals with a single click.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-md text-left"
        >
          <FaMagic className="text-3xl text-purple-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">AI Cover Letters</h3>
          <p className="text-gray-600 text-sm">
            Let AI draft personalized cover letters tailored to your role,
            experience, and preferences.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-2xl shadow-md text-left"
        >
          <FaDownload className="text-3xl text-green-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">PDF Download</h3>
          <p className="text-gray-600 text-sm">
            Download your resume in beautiful, print-ready formats—instantly and
            without watermarks.
          </p>
        </motion.div>
      </section>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-24"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Ready to create your next opportunity?
        </h2>
        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            Start Building Now
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
