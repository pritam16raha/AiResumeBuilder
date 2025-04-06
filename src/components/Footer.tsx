// components/Footer.tsx

import Link from "next/link";
import { Github, Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Info */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              AI Resume Builder
            </h2>
            <p className="text-sm mt-1 text-gray-400">
              Build professional resumes effortlessly using AI.
            </p>
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="https://github.com/pritam16raha"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="hover:text-white transition" />
            </a>
            <a
              href="https://www.linkedin.com/in/pritam16raha/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="hover:text-white transition" />
            </a>
            <a href="mailto:rahapritam32@gmail.com">
              <Mail className="hover:text-white transition" />
            </a>
          </div>
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
