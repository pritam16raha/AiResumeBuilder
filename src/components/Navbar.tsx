// components/Navbar.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 tracking-tight"
        >
          AI<span className="text-gray-900">Resume</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/features" className="hover:text-blue-600 transition">
            Features
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
          <Link href="/dashboard" className="hover:text-blue-600 transition">
            Dashboard
          </Link>
          <Link href="/resume/builder" className="hover:text-blue-600 transition">
            Build Resume
          </Link>
          <Link
            href="/signin"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
          <Link href="/logout" className="text-red-400">
            🚪 Logout
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-6 pt-2 space-y-3 text-gray-700 font-medium">
          <Link href="/" className="block hover:text-blue-600">
            Home
          </Link>
          <Link href="/features" className="block hover:text-blue-600">
            Features
          </Link>
          <Link href="/templates" className="block hover:text-blue-600">
            Templates
          </Link>
          <Link href="/dashboard" className="block hover:text-blue-600">
            Dashboard
          </Link>
          <Link
            href="/signin"
            className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
          <Link href="/logout" className="text-red-400 hover:underline">
            🚪 Logout
          </Link>
        </div>
      )}
    </nav>
  );
}
