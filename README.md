<h1 align="center"> NorthStar ✶.˚ </h1>

<p align="center"> <b> The mentor every ambitious builder wishes they had.</b>
</p>
<p align="center">
  An AI mentorship ecosystem for ambitious engineering students.
 </p>


---

### 📖 Table of Contents
- [Demo Links](#-demo-links)
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Structure](#-project-structure)
- [Demo & Screenshots](#-demo--screenshots)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [ AI & Codex Workflow](#-ai--codex-workflow)
---

## 🔗 Demo Links

• **Live Application:** [Click here to experience NorthStar!](https://northstar-ai-mentor.vercel.app/)

• **Demo Video:** [Click here to watch the demo!]()

• **GitHub Repository:** [GitHub Repo Link!](https://github.com/yashvicoded/NorthStar.git)

• **Project Announcement:** [LinkedIn post!]()

---

## ⭐ Overview

Northstar is an AI mentorship ecosystem built for ambitious engineering students who lack access to strong technical peer circles, industry exposure, and personalized guidance.

Instead of acting like a generic chatbot, Northstar functions as a trusted elder sibling—helping students navigate technical learning, project decisions, internships, hackathons, and career uncertainty through contextual, long-term mentorship.

The platform combines:

- Personalised AI Mentor
- Weekly Direction Engine
- Opportunity Radar
- Growth Timeline

to help students focus on the right next step instead of getting lost in information overload.
---

## ✨ Key Features
💬 AI Mentor with Long-Term Context

Unlike generic chatbots, NorthStar acts as a persistent technical mentor that remembers onboarding data, previous conversations, goals, and challenges. Students can ask questions about projects, learning paths, internships, or technical decisions while maintaining continuity over time.

🧭 Weekly Direction Engine

Generates personalized weekly action plans based on the student's profile, interests, current goals, and progress. Instead of consuming endless tutorials, students receive a clear and actionable next step every week.

🎯 Opportunity Radar

A curated opportunity discovery system that surfaces relevant hackathons, internships, open-source programs, and learning opportunities. Students can save opportunities and build a personalized pipeline aligned with their interests.

📈 Growth Timeline

A visual record of milestones, projects, skills, and achievements. The timeline helps students track progress over time and maintain momentum throughout their engineering journey.

🛠️ Personalized Onboarding

A structured onboarding flow captures academic background, technical interests, preferred technologies, confidence levels, and career aspirations. This context powers a more personalized mentorship experience.

🔐 Secure Authentication & Persistent Profiles

Users can securely create accounts, maintain profiles, and access their mentorship history across sessions. NorthStar preserves context so students can continue their growth journey without starting from scratch each time.

---

## 🛠️ Tech Stack & Architecture

NorthStar is built on a modern TypeScript stack, using a client-centric component architecture optimized for fast load times, robust data-flow management, and responsive interfaces.

| Technology | Purpose | Why it was Chosen |
| :--- | :--- | :--- |
| **Next.js (`^16.2.6`)** | Core Web Framework | Provides seamless App Router page transitions, optimized server-rendered components, built-in API routing mechanisms, and fast build processes. |
| **React (`^18.2.0`)** | UI Rendering & Component Lifecycle | Leverages robust state encapsulation, efficient virtual DOM diffing, and declarative UI patterns essential for complex interactive dashboards. |
| **TypeScript (`^5.3.0`)** | Static Typing & Code Safety | Guarantees strict type safety across database schemas, service layers, and React props, avoiding runtime bugs in career metrics computations. |
| **Tailwind CSS (`^3.3.0`)** | Declarative Utility Styling | Allows rapid visual construction of highly custom, themeable dashboard layouts, interactive state effects, and fully responsive layouts. |
| **Zustand (`^4.4.0`)** | Global State Store | A lightweight, fast, and hook-based state management library that stores local sessions, user filters, and sidebar states without boilerplate. |
| **Framer Motion (`^10.16.0`)**| Micro-interactions & Animations | Adds smooth, physical transitions to timeline nodes, collapsible sidebar drawers, and list updates to improve overall user engagement. |
| **Supabase Client (`^2.38.0`)**| Real-Time DB & Auth Client | Enables rapid integration with user authentication states, row-level security logic, and direct communication with secure relational storage. |
| **Lucide React (`^0.294.0`)** | Contextual Iconography | Supplies lightweight, highly recognizable, and scalable vector icons for dashboards, timelines, and profile interfaces. |


### 🏗️ System Architecture
  <img src="C:\Users\Maharaj\Downloads\Architecture Diagram.png" alt="Architecture Diagram" width="100%">

---

## 📁 Project Structure

NorthStar follows a modular Next.js architecture with separate layers for UI, business logic, API routes, and data access.
The structure below highlights the major parts of the application:
```
yashvicoded-NorthStar-f497efe/

├── 📁 src/                          # Application source directory
│   ├── 📄 middleware.ts             # Global Next.js route protection and session verification
│   ├── 📄 schema.sql                # Relational database layout definitions
│   ├── 📄 globals.css               # Global styling, Tailwind directives, and custom root variables
│   ├── 📁 constants/                # Immutable layout strings and static values
│   │   └── 📄 index.ts              # Exported menu paths, constants, and global variables
│   ├── 📁 hooks/                    # Reusable stateful custom React hooks
│   ├── 📁 app/                      # Next.js App Router routing framework
│   │   ├── 📁 api/                  # Serverless API endpoints
│   │   │   ├── 📁 direction/        # Core path calculation endpoint
│   │   │   └── 📁 chat/             # Chat execution logic endpoint
│   │   ├── 📁 dashboard/            # Authenticated user dashboard section
│   │   │   ├── 📁 opportunities/    # Opportunity exploration tool
│   │   │   ├── 📁 mentor/           # Mentorship communication network
│   │   │   ├── 📁 timeline/         # Visual chronological career roadmaps
│   │   │   ├── 📁 direction/        # Guided pathfinding tool
│   │   │   └── 📁 profile/          # User professional metrics
│   │   ├── 📁 auth/                 # Signin & Registration flow pages
│   │   │   ├── 📁 signup/           # Direct registration workspace
│   │   │   ├── 📁 signin/           # Secure system login workspace
│   │   │   └── 📁 callback/         # Authentication provider webhook target
│   │   └── 📁 onboarding/           # New account configuration stage
│   ├── 📁 lib/                      # Core utility wrappers and SDK instances
│   │   └── 📁 supabase/             # Helper utilities for database interaction
│   ├── 📁 services/                 # Layer interfacing app with Supabase queries
│   │   ├── 📄 profile.ts            # Read/Write profiles data mapping
│   │   ├── 📄 timeline.ts           # Career roadmap node state updates
│   │   ├── 📄 opportunities.ts      # CRUD operations for matching job boards
│   │   ├── 📄 mentor.ts             # Registers mentorship queries & messages
│   │   └── 📄 direction.ts          # Integrates directional outputs & recommendations
│   ├── 📁 components/               # High-integrity atomic UI elements
│   │   └── 📁 ui/                   # Modular design system elements (shadcn-inspired)
│   └── 📁 types/                    # System-wide TypeScript interface lists
│       └── 📄 index.ts              # Database mappings and user data definitions
```

---

## 📸 Demo & Screenshots

Explore the structural visual framework of the **NorthStar** interface. This collection presents the responsive dashboard design, layout features, interactive timelines, and step-by-step career path guides.

## 🖼️ Screenshots

  <img src="https://placehold.co/800x450/111827/ffffff?text=NorthStar+Dashboard+Overview" alt="NorthStar Dashboard" width="100%">
  <em><p align="center">Figure 1: The main Dashboard index, featuring active progression summaries, dynamic metrics, and direct alerts.</p></em>

  <img src="https://placehold.co/800x450/1f2937/ffffff?text=Dynamic+Career+Timeline" alt="Dynamic Career Timeline" width="100%">
  <em><p align="center">Figure 2: The interactive career timeline, providing a comprehensive historical view and path planning nodes.</p></em>

  <img src="https://placehold.co/800x450/111827/ffffff?text=Mentorship+Matchmaking+and+Chat" alt="Mentorship Interface" width="100%">
  <em><p align="center">Figure 3: Interactive mentor communications interface with direct messaging features and progress logs.</p></em>

  <img src="https://placehold.co/800x450/1f2937/ffffff?text=Career+Direction+Finder+and+AI+Advisor" alt="AI Career Guidance" width="100%">
  <em><p align="center">Figure 4: The Direction Finder utility screen, where interactive diagnostics outline potential next career milestones.</p></em>

  <img src="https://placehold.co/800x450/111827/ffffff?text=Opportunities+Discovery+and+Pipeline+Board" alt="Opportunities Board" width="100%">
  <em><p align="center">Figure 5: Opportunities dashboard tracking applications, open postings, and skill-acquisition processes.</p></em>

  <img src="https://placehold.co/800x450/1f2937/ffffff?text=Profile+and+Onboarding+Wizard" alt="User Onboarding Wizard" width="100%">
  <em><p align="center">Figure 6: Step-by-step onboarding process, capturing skills, preferences, and long-term targets to build user models.</p></em>

## 🎬 Video Demo

  <a href="https://example.com/your-video-link-1" target="_blank">
    <img src="https://placehold.co/800x450/1f1e2e/c5a8ff?text=Watch+NorthStar+Interactive+Walkthrough" alt="Interactive System Walkthrough" width="100%">
  </a>
  <em><p align="center">Watch an interactive video walkthrough of the onboarding workspace, dynamic path rendering, and mentor interface.</p></em>

---

## 🚀 Getting Started

Follow these step-by-step instructions to set up, build, and run a local development instance of NorthStar on your machine.

### Prerequisites

Ensure you have the following system resources installed before starting your installation process:
- **Node.js** (v18.0.0 or higher is highly recommended)
- **NPM** package manager (comes bundled with Node.js)
- **TypeScript environment** (supported globally or via internal package scope)

### Installation Steps

1.  **Clone the Repository**
    Clone the codebase locally to your target environment using standard Git procedures:
    ```bash
    git clone https://github.com/yashvicoded/NorthStar.git
    cd NorthStar
    ```

2.  **Install Required Dependencies**
    Execute the installation script using npm to download and link all required package configurations:
    ```bash
    npm install
    ```

3.  **Run Compilation Verification & Lint Check**
    Before executing the application locally, verify your environment configurations and lint parameters:
    ```bash
    # Run the lint process to ensure style guide compliance
    npm run lint

    # Run TypeScript validation rules
    npm run type-check
    ```

4.  **Execute the Local Development Environment**
    Launch the internal Next.js development server to compile and run the frontend engine:
    ```bash
    npm run dev
    ```
    Once compilation completes, open your browser and navigate to the local portal:
    *   **Local URL:** `http://localhost:3000`

5.  **Build and Export for Production**
    To compile a fast, production-optimized output build, execute the Next.js bundle compiler:
    ```bash
    # Generate the optimized production bundle
    npm run build

    # Execute the compiled server locally
    npm run start
    ```

---

## 🔧 Usage

NorthStar is designed to help engineering students move from confusion to clarity through personalized mentorship, direction, and opportunity discovery.

### 1. Create Your Profile

- Sign up and complete onboarding.
- Share your academic background, interests, preferred technologies, current challenges, and long-term goals.
- NorthStar uses this context to personalize mentorship and recommendations.

### 2. Talk to Your AI Mentor

Navigate to **Mentor** and start a conversation.

Ask questions like:

- "How should I learn React without getting overwhelmed?"
- "Should I focus on DSA or projects right now?"
- "How do I prepare for internships?"
- "What should I build next?"

The mentor provides practical guidance while maintaining context across conversations.

### 3. Get Your Weekly Direction

Visit **This Week** to generate a personalized action plan.

NorthStar helps you:

- Identify priorities
- Focus on high-impact tasks
- Avoid information overload
- Maintain consistent progress

### 4. Discover Opportunities

Use **Opportunity Radar** to explore:

- Hackathons
- Internships
- Open-source programs
- Learning opportunities

Save opportunities that match your interests and goals.

### 5. Track Your Growth

The **Timeline** feature provides a visual record of your journey.

Track:

- Projects completed
- Skills learned
- Career milestones
- Progress over time

---
## 🤖 AI & Codex Workflow

NorthStar was developed using an AI-assisted development workflow powered by OpenAI tools and Codex.

### How AI Was Used

- Architecture planning and feature decomposition
- Rapid UI iteration and component generation
- Debugging authentication and state-management issues
- API integration assistance
- Refactoring and code quality improvements
- Documentation and developer workflow support

### Development Workflow

1. Define product requirements and user experience.
2. Use Codex-assisted prompting to generate implementation plans.
3. Build features iteratively in Next.js and Supabase.
4. Use AI-assisted debugging to resolve API, authentication, and state persistence issues.
5. Refine UX, onboarding, mentorship flows, and opportunity discovery systems.

This workflow allowed rapid MVP development while maintaining a focus on product design, technical execution, and user experience.
---


<p align="center">Made with ❤️ by the NorthStar Team</p>
<p align="center">
  <a href="#">⬆️ Back to Top</a>
</p>
