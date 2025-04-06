"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 px-6 py-16">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">📄 Terms & Conditions</h1>
          <p className="text-gray-600 text-lg">Last updated: April 6, 2025</p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700">
            By accessing and using the AI Resume Builder, you agree to be bound
            by these Terms and all applicable laws and regulations. If you do
            not agree, you may not use the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            2. Use of the Platform
          </h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>You must be at least 13 years old to use this service.</li>
            <li>
              You agree to provide accurate and current information during
              registration.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            3. Intellectual Property
          </h2>
          <p className="text-gray-700">
            All content, including UI components, branding, and resume
            templates, are the intellectual property of this platform and may
            not be reused or reproduced without permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. User Content</h2>
          <p className="text-gray-700">
            You retain ownership of your resume data, but you grant us a license
            to store and process it solely for the purpose of delivering the
            service to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            The AI Resume Builder is provided &quot;as is&quot; and we make no warranties
            regarding its accuracy or availability. We are not liable for any
            loss or damage resulting from its use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms from time to time. Continued use of the
            platform after changes constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p className="text-gray-700">
            For questions about these Terms, please reach out via our{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              Contact
            </a>{" "}
            page or email{" "}
            <span className="text-blue-600">rahapritam32@gmail.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
