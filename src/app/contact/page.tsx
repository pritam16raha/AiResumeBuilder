"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/contact", formData);
      if (res.data.success) {
        alert("✅ Message sent!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(res.data.error || "❌ Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-4 md:px-10">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">📬 Get in Touch</h1>
        <p className="text-gray-600 text-lg">
          💬 Have feedback or suggestions? I&apos;d love to hear how I can make
          my AI Resume Builder even better for you. Drop me a message on the
          Contact page — your input helps me grow! 🚀
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="bg-white p-8 shadow-xl rounded-2xl space-y-6">
          <h2 className="text-2xl font-semibold mb-4">
            📞 Contact Information
          </h2>
          <div className="flex items-center gap-4">
            <Mail className="text-blue-600" />
            <span className="text-gray-700">support@pritamraha.in</span>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-blue-600" />
            <span className="text-gray-700">rahapritam32@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="text-blue-600" />
            <span className="text-gray-700">+91 9749215498</span>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="text-blue-600 mt-1" />
            <div className="flex flex-col">
              <span className="text-gray-700">
                GJ-4/2, Rabindra Pally A Block, Durgapur-1
              </span>
              <span className="text-gray-700">West Bengal - 713201</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 shadow-xl rounded-2xl space-y-6"
        >
          <h2 className="text-2xl font-semibold mb-4">📝 Send us a Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2 disabled:opacity-70"
          >
            <Send size={18} />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
