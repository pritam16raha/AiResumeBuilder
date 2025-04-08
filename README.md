# 💼 AI Resume Builder

AI-powered Resume Builder with real-time preview, multi-template support, dynamic cover letter generation, and secure authentication.

![Next.js](https://img.shields.io/badge/Next.js-14-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 🚀 Live Demo

👉 [https://ai-resume-builder-jmu7.vercel.app/](https://ai-resume-builder-jmu7.vercel.app/)

---

## ✨ Features

- ✍️ Build a professional resume with multiple modern templates
- 🤖 AI-powered summary and cover letter generation (Gemini API)
- 🧠 Smart prompts for experience and project descriptions
- 💾 Save resumes securely to Supabase (PostgreSQL)
- 📄 Download resumes and cover letters as PDF
- 🔐 Auth (JWT-based) + Email OTP Login + Role-based access
- 🎨 Responsive design with dark mode toggle
- 🧩 Modular folder structure for easy scalability

---

## 🛠 Tech Stack

**Frontend:**
- Next.js 14 (App Router, SSR)
- TypeScript
- Tailwind CSS + shadcn/ui
- React Hook Form + Zod

**Backend:**
- Supabase (PostgreSQL, auth)
- Drizzle ORM
- Google Gemini API

**Other Tools:**
- Docker (Dev-ready setup)
- JWT Auth
- html2canvas + jsPDF (PDF generation)
- ESLint + Prettier

---

## 📁 Folder Structure (key files)

```
/src
├── app
│   ├── api                  # API routes (cover letter, resume save, etc)
│   ├── dashboard            # Resume dashboard UI
│   └── resume               # Resume + cover letter routes
├── components
│   ├── resume               # Resume builder components
│   └── templates            # All resume template UIs
├── db                      # Drizzle schema + config
├── lib                     # JWT utils, helpers
├── types                   # Global TypeScript interfaces
├── utils                   # PDF download, print, etc.
```

---

## ⚙️ Getting Started

```bash
# 1. Clone this repo
$ git clone https://github.com/yourname/ai-resume-builder.git

# 2. Install dependencies
$ cd ai-resume-builder && npm install

# 3. Add environment variables
$ cp .env.example .env.local
# Fill in Supabase keys, Gemini API key, JWT secret, etc.

# 4. Run locally
$ npm run dev
```

---

## 🔐 Environment Variables

Create a `.env.local` file with:
```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
JWT_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 📸 Screenshots

![Home Page](<Screenshot 2025-04-08 131334.png>)\
![AI Cover Letter Generator](<Screenshot 2025-04-08 131916-1.png>)
![AI Summary Generator](<Screenshot 2025-04-08 132110.png>)
![AI Project Description Generator](<Screenshot 2025-04-08 132505.png>)
![AI Experience Description Generator](<Screenshot 2025-04-08 132606.png>)

## 🚀 Database Table & Relation

![DATABASE-Supabase](<supabase-schema-srfyktjobxlbtizbbfrp (4).png>)

---

## 📌 Roadmap

- [x] Resume builder with templates
- [x] Cover letter AI generator
- [x] PDF downloads
- [x] Role-based login + dashboard
- [ ] Resume sharing via public link
- [ ] AI-powered job matcher (coming soon)

---

## ✍️ Author

Built with ❤️ by [Pritam Raha](https://github.com/pritam16raha)

---

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for more details.

---

## 💡 Feedback & Contributions

Pull requests and feedback are welcome! Feel free to fork and build your version.

---

> "Empower your career with AI. Make every word count."

