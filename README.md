<h1 align="center"> NorthStar </h1>

<p align="center"> <b> The mentor every ambitious builder wishes they had.</b>
</p>
<p align="center">
  An AI mentorship ecosystem for ambitious engineering students.
 </p>


---

### 📖 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Structure](#-project-structure)
- [Demo & Screenshots](#-demo--screenshots)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)

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

NorthStar is built around a series of targeted features designed to address critical pain points in professional growth and career planning.

*   🚀 **Interactive Growth Hub**
    Experience a unified dashboard that visually represents your active milestones, profile completeness, and critical career paths. Designed with fluid React states and Tailwind CSS transitions, the growth hub keeps you aligned with your primary professional goals.

*   🗺️ **Dynamic Career Timelines**
    Visualize your long-term and short-term career pathways. The timeline interface maps out logical progression steps, skill sets, and experience requirements, converting ambitious career goals into actionable, bite-sized chronological milestones.

*   💬 **Guided Direction & AI-Assisted Consultation**
    Leverage modern intelligent assistance using native conversational interfaces and targeted pathfinding systems. Connected directly through specific `/api/chat` and `/api/direction` endpoints, users can query path structures, resolve development blocks, and ask career questions in real time.

*   🤝 **Mentorship Connections**
    Bridge the gap between expert advice and personal growth. The built-in mentoring module helps users document connections, manage communication logs, and build pathways toward meaningful 1-on-1 relationships with domain experts.

*   💼 **Opportunities Pipeline**
    Organize and keep track of active job openings, learning courses, open-source projects, and internal promotions. This tool helps you organize all prospective career-changing developments inside a clean, actionable status-tracking board.

*   🔒 **Secure Onboarding & Authentication Guarding**
    Ensure all private career roadmaps, personal mentor logs, and career notes are secured using robust authentication. With automatic middleware routing and protected-route wrapping, your sensitive professional metadata remains private, customized, and protected.

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

---

## 📁 Project Structure

Below is the verified structural mapping of the NorthStar repository. The codebase separates layout routing, stateful React logic, structural services, and database schemas for maximum modularity and maintainability.

```
yashvicoded-NorthStar-f497efe/

├── 📁 src/                          # Application source directory
│   ├── 📄 middleware.ts             # Global Next.js route protection and session verification
│   ├── 📄 schema.sql                # Relational database layout definitions
│   ├── 📄 globals.css               # Global styling, Tailwind directives, and custom root variables
│   ├── 📁 constants/                # Immutable layout strings and static values
│   │   └── 📄 index.ts              # Exported menu paths, constants, and global variables
│   ├── 📁 hooks/                    # Reusable stateful custom React hooks
│   │   └── 📄 useAuth.ts            # Encapsulated authentication hook handling sessions
│   ├── 📁 app/                      # Next.js App Router routing framework
│   │   ├── 📄 layout.tsx            # Global application theme wrapper
│   │   ├── 📄 page.tsx              # Public informational landing page
│   │   ├── 📁 api/                  # Serverless API endpoints
│   │   │   ├── 📁 direction/        # Core path calculation endpoint
│   │   │   │   └── 📄 route.ts      # Processes career path recommendations
│   │   │   └── 📁 chat/             # Chat execution logic endpoint
│   │   │       └── 📄 route.ts      # Processes dialogue interactions
│   │   ├── 📁 dashboard/            # Authenticated user dashboard section
│   │   │   ├── 📄 layout.tsx        # Dashboard layout (Sidebar, Header wrapper)
│   │   │   ├── 📄 page.tsx          # Central dashboard metric index overview
│   │   │   ├── 📁 opportunities/    # Opportunity exploration tool
│   │   │   │   └── 📄 page.tsx      # Main opportunities tracker page
│   │   │   ├── 📁 mentor/           # Mentorship communication network
│   │   │   │   └── 📄 page.tsx      # Mentoring session manager page
│   │   │   ├── 📁 timeline/         # Visual chronological career roadmaps
│   │   │   │   └── 📄 page.tsx      # Dynamic timeline progression board
│   │   │   ├── 📁 direction/        # Guided pathfinding tool
│   │   │   │   └── 📄 page.tsx      # Diagnostic questions & active guide page
│   │   │   └── 📁 profile/          # User professional metrics
│   │   │       └── 📄 page.tsx      # Profile configuration and summary page
│   │   ├── 📁 auth/                 # Signin & Registration flow pages
│   │   │   ├── 📁 signup/           # Direct registration workspace
│   │   │   │   └── 📄 page.tsx      # SignUp page with form validation
│   │   │   ├── 📁 signin/           # Secure system login workspace
│   │   │   │   └── 📄 page.tsx      # SignIn page with error alerts
│   │   │   └── 📁 callback/         # Authentication provider webhook target
│   │   │       └── 📄 route.ts      # Verifies incoming auth codes and maps sessions
│   │   └── 📁 onboarding/           # New account configuration stage
│   │       └── 📄 page.tsx          # Step-by-step preference diagnostic page
│   ├── 📁 lib/                      # Core utility wrappers and SDK instances
│   │   ├── 📄 utils.ts              # Structural utility wrappers (e.g., clsx, tailwind-merge)
│   │   ├── 📄 supabase.ts           # Singleton Supabase database client instance
│   │   ├── 📄 auth-content.tsx      # Global React Context providing auth status
│   │   └── 📁 supabase/             # Helper utilities for database interaction
│   │       └── 📄 route.ts          # Server-safe Supabase route handlers
│   ├── 📁 services/                 # Layer interfacing app with Supabase queries
│   │   ├── 📄 profile.ts            # Read/Write profiles data mapping
│   │   ├── 📄 timeline.ts           # Career roadmap node state updates
│   │   ├── 📄 opportunities.ts      # CRUD operations for matching job boards
│   │   ├── 📄 mentor.ts             # Registers mentorship queries & messages
│   │   └── 📄 direction.ts          # Integrates directional outputs & recommendations
│   ├── 📁 components/               # High-integrity atomic UI elements
│   │   ├── 📄 protected-route.tsx   # Client Guard wrapping protected layout pages
│   │   └── 📁 ui/                   # Modular design system elements (shadcn-inspired)
│   │       ├── 📄 button.tsx        # Standardized functional button interface
│   │       ├── 📄 input.tsx         # Styled forms input element text area
│   │       └── 📄 card.tsx          # Configurable structural container card
│   └── 📁 types/                    # System-wide TypeScript interface lists
│       └── 📄 index.ts              # Database mappings and user data definitions
├── 📄 .eslintrc.json                # Custom linter rule specifications
├── 📄 .prettierrc                   # Universal stylistic code layout configs
├── 📄 tailwind.config.ts            # Custom tailwind layout extensions
├── 📄 tsconfig.json                 # Type checker compilation setups
├── 📄 postcss.config.js             # Preprocessor utility configuration
├── 📄 next.config.js                # Core Next.js execution parameters
├── 📄 package.json                  # Manifest mapping scripts & dependencies
├── 📄 package-lock.json             # Precise package version verification tree
├── 📄 QUICKSTART.md                 # Brief setup reference guide
├── 📄 DEVELOPMENT.md                # Local development instructions
├── 📄 SETUP_COMPLETE.md             # Integration testing milestones checklists
└── 📄 .gitignore                    # Explicit untracked files system checklist
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

## 🎬 Video Demos

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

The NorthStar application has been structured to make professional mapping, goal setting, and mentor logging simple and intuitive.

### 1. User Authentication & Onboarding Flow
Upon accessing the platform, users must create a profile to start tracking goals:
- Go to the public entry screen and navigate to **Sign Up** (`/auth/signup`).
- Complete your login step; this directs you into the structured **Onboarding Wizard** (`/onboarding`).
- Onboarding gathers your core competency metrics, targets, and selected focus industries, constructing a custom profile in `schema.sql`.

### 2. Utilizing the Core Navigation Dashboard
The authenticated workspace houses five focus tools configured inside `/app/dashboard/`:

```
┌─────────────────────────────────────────────────────────────────┐
│                           NorthStar                             │
├───────────────┬─────────────────────────────────────────────────┤
│ 🧭 Overview   │ Welcome back! Dynamic Progress Tracker          │
│ 🗺️ Timeline   │ Step-by-step career path planning maps         │
│ 🤝 Mentoring  │ Match details & communication portal            │
│ 💼 Jobs       │ Opportunity Pipelines & Activity Logs           │
│ 🔍 Direction  │ Path Finder Diagnostic & AI Consultations       │
└───────────────┴─────────────────────────────────────────────────┘
```

*   **Dynamic Timelines (`/dashboard/timeline`):** Add, update, or remove target milestones. The frontend visualizer automatically updates your chronological career map with Framer Motion animations.
*   **Intelligent Path Finding (`/dashboard/direction`):** Submit your career path questions to receive automated diagnostic direction, powered behind the scenes by Next.js API route actions.
*   **Opportunities Tracker (`/dashboard/opportunities`):** Maintain a Kanban-style pipeline of prospective job openings, course details, and active certificates.
*   **Mentorship Space (`/dashboard/mentor`):** Select target career mentors and schedule updates to maintain regular progress logging.

---

## 🤝 Contributing

We welcome contributions to improve NorthStar! Your input helps make this project better for everyone.

### How to Contribute

1. **Fork the repository** - Click the 'Fork' button at the top right of this page
2. **Create a feature branch** 
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** - Improve code, documentation, or features
4. **Test thoroughly** - Ensure all functionality works as expected
   ```bash
   npm run type-check
   # AND
   npm run lint
   ```
5. **Commit your changes** - Write clear, descriptive commit messages
   ```bash
   git commit -m 'Add: Amazing new feature that does X'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** - Submit your changes for review

### Development Guidelines

- ✅ Follow the existing code style and conventions
- 📝 Add comments for complex logic and algorithms
- 🧪 Write tests for new features and bug fixes
- 📚 Update documentation for any changed functionality
- 🔄 Ensure backward compatibility when possible
- 🎯 Keep commits focused and atomic

### Ideas for Contributions

We're looking for help with:

- 🐛 **Bug Fixes:** Report and fix bugs
- ✨ **New Features:** Implement requested features from issues
- 📖 **Documentation:** Improve README, add tutorials, create examples
- 🎨 **UI/UX:** Enhance user interface and experience
- ⚡ **Performance:** Optimize code and improve efficiency
- 🌐 **Internationalization:** Add multi-language support
- 🧪 **Testing:** Increase test coverage
- ♿ **Accessibility:** Make the project more accessible

### Code Review Process

- All submissions require review before merging
- Maintainers will provide constructive feedback
- Changes may be requested before approval
- Once approved, your PR will be merged and you'll be credited

### Questions?

Feel free to open an issue for any questions or concerns. We're here to help!

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### What this means:

- ✅ **Commercial use:** You can use this project commercially
- ✅ **Modification:** You can modify the code
- ✅ **Distribution:** You can distribute this software
- ✅ **Private use:** You can use this project privately
- ⚠️ **Liability:** The software is provided "as is", without warranty
- ⚠️ **Trademark:** This license does not grant trademark rights

---

<p align="center">Made with ❤️ by the NorthStar Team</p>
<p align="center">
  <a href="#">⬆️ Back to Top</a>
</p>
