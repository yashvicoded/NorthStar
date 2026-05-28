# Northstar ✦

### AI Mentorship for Ambitious Engineers

> *Built for engineering students who have talent, curiosity, and ambition — but not always the mentorship, clarity, or network to guide them.*

Northstar is an emotionally intelligent AI mentorship platform designed for students from Tier-2 and Tier-3 colleges navigating tech careers without clear direction.

Unlike generic AI chatbots, Northstar acts more like a thoughtful mentor who remembers your journey, understands your struggles, and helps you move forward with clarity over time.

---

## ✨ Why Northstar Exists

A lot of talented students don’t fail because they lack capability.
They fail because they’re overwhelmed.

Too many tutorials.
Too many roadmaps.
Too many opinions.
No guidance that actually feels personal.

Northstar was built to solve that.

It helps students:

* Find direction
* Stay consistent
* Reduce overwhelm
* Build confidence
* Make smarter career decisions
* Track long-term progress

The goal is simple:

> Help ambitious engineers stop feeling lost.

---

# 🧠 Core Experience

## 1. Persistent Mentor Chat

An AI mentor that remembers your engineering journey across conversations.

* Context-aware conversations
* Long-term memory
* Practical technical guidance
* Emotional reassurance
* Reduced overwhelm

Northstar is intentionally designed to feel calm, human, and believable — not robotic.

---

## 2. Weekly Direction Engine

AI-generated weekly guidance tailored to the student’s current phase.

Includes:

* Priority recommendations
* Project focus suggestions
* Learning adjustments
* Skill recommendations
* Realistic next steps

Instead of giving infinite options, Northstar narrows focus.

---

## 3. Opportunity Radar

Curated opportunities matched intelligently to user interests and skill level.

Examples:

* Hackathons
* Internships
* Fellowships
* Open-source programs
* Student communities

Each recommendation explains:

* Why it matches the user
* Difficulty level
* Suggested preparation

---

## 4. Progress Timeline

A visual timeline of growth over time.

Tracks:

* Projects
* Wins
* Goals
* Milestones
* Career progression

Students can literally see how far they’ve come.

---

## 5. Conversational Onboarding

A warm onboarding flow that builds a “Journey Snapshot” profile.

Northstar learns:

* Current skill level
* Tech interests
* Learning phase
* Career goals
* Biggest struggles
* Confidence level

This becomes the foundation for personalized mentorship.

---

# 🎨 Product Philosophy

Northstar is designed to feel:

* Calm
* Premium
* Human
* Minimal
* Warm
* Founder-grade
* Emotionally intelligent

### Design Inspiration

* Linear
* Notion
* Arc Browser
* Raycast
* Apple
* Vercel

The experience prioritizes:

* excellent spacing
* subtle motion
* soft shadows
* breathable layouts
* polished interactions

---

# ⚙️ Tech Stack

| Category   | Technology               |
| ---------- | ------------------------ |
| Framework  | Next.js 14 (App Router)  |
| Language   | TypeScript               |
| Styling    | Tailwind CSS + shadcn/ui |
| Animations | Framer Motion            |
| Backend    | Supabase                 |
| AI         | OpenAI API               |
| Deployment | Vercel                   |

---

# 📂 Project Structure

```bash
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── auth/
│   ├── onboarding/
│   ├── dashboard/
│   └── api/
│
├── components/
│   ├── ui/
│   ├── mentor/
│   ├── dashboard/
│   └── onboarding/
│
├── lib/
├── services/
├── hooks/
├── constants/
├── types/
└── globals.css
```

---

# 🚀 Getting Started

## Prerequisites

* Node.js 18+
* npm / yarn
* Supabase project
* OpenAI API key

---

## Installation

### 1. Clone the repository

```bash
git clone <repo-url>
cd northstar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=
```

---

### 4. Start development server

```bash
npm run dev
```

Visit:

```txt
http://localhost:3000
```

---

# 🧩 MVP Features

* ✅ Landing Page
* ✅ Authentication
* ✅ Dashboard Shell
* ✅ Mentor Chat
* ✅ Onboarding Flow
* ✅ Weekly Direction
* ✅ Opportunity Radar
* ✅ Progress Timeline
* ⏳ AI Integration
* ⏳ Database Optimization
* ⏳ Final UX Polish

---

# 🗄️ Database Overview

### Core Tables

* Users
* UserProfiles
* Threads
* Messages
* Opportunities
* TimelineEvents
* WeeklyDirections

Built on **Supabase PostgreSQL** with persistent user memory and structured mentorship data.

---

# 🤖 Mentor Personality System

Northstar’s mentor is intentionally designed to avoid sounding like a generic AI assistant.

## The mentor SHOULD:

* Remember past conversations
* Reduce confusion
* Encourage building over consuming
* Be calm and practical
* Guide realistically
* Support emotionally without sounding fake

## The mentor SHOULD NOT:

* Sound corporate
* Give generic motivational advice
* Overwhelm users with options
* Push endless tutorials
* Feel robotic

---

# ⚡ Performance & UX

* Responsive design
* Smooth Framer Motion animations
* Dark/light mode
* Accessible UI components
* Optimized page loads
* Elegant loading states
* Modern app-shell architecture

---

# 🌍 Vision Beyond the MVP

Northstar is ultimately aiming to become:

> The AI career operating system for ambitious students who never had access to elite mentorship.

Future ideas:

* Voice mentorship
* AI memory graph
* Peer circles
* Resume intelligence
* Project reviews
* Placement preparation
* Personalized engineering roadmaps
* Founder & research tracks

---

# 🚢 Deployment

Deploy instantly with Vercel:

```bash
vercel deploy
```

---

# 🤝 Contributing

This project was built as a hackathon MVP focused on:

* speed
* polish
* emotional UX
* product thinking

Contributions, ideas, and feedback are welcome.

---

# 📜 License

Proprietary — Northstar MVP

---



### ✦ Built for students trying to figure it all out ✦

