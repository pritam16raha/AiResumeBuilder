"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🔐 Privacy Policy</h1>
          <p className="text-gray-600 text-lg">Last updated: April 6, 2025</p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p className="text-gray-700">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information when you use our AI
            Resume Builder platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Your name, email, and phone number provided during signup.</li>
            <li>
              Resume content including education, experience, and projects.
            </li>
            <li>Technical information such as browser type and IP address.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>To help you build and store your resume data securely.</li>
            <li>
              To improve the performance and functionality of our platform.
            </li>
            <li>To contact you regarding updates or new features.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Data Protection</h2>
          <p className="text-gray-700">
            We implement industry-standard security measures to protect your
            data. Sensitive information like passwords are hashed, and tokens
            are securely stored.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. Third-Party Services
          </h2>
          <p className="text-gray-700">
            We may use third-party services such as analytics, hosting, or AI
            providers, who have access to limited data only to perform tasks on
            our behalf.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
          <p className="text-gray-700">
            You have the right to access, update, or delete your data at any
            time. For account or data-related concerns, please contact us at{" "}
            <span className="text-blue-600">rahapritam32@gmail.com</span>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, feel free to
            reach out through our{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              Contact
            </a>{" "}
            page.
          </p>
        </section>
      </div>
    </div>
  );
}
