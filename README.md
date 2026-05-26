# Northstar - AI Mentorship for Ambitious Engineers

An emotionally intelligent AI mentorship ecosystem for ambitious engineering students from Tier-2 and Tier-3 colleges who lack mentorship, industry exposure, and clear direction.

## Vision

**Northstar is NOT a generic AI chatbot.**

Northstar should feel less like ChatGPT and more like a trusted elder sibling who remembers your engineering journey, understands your struggles, and helps guide your next step over time.

The experience should feel:
- Emotionally warm
- Calm
- Premium
- Modern
- Founder-grade
- Highly polished
- Minimal
- Believable
- Human

## Key Product Features

### 1. **Persistent Mentor Chat**
- Threaded conversations that remember your journey
- Emotionally intelligent guidance
- Reduces overwhelm and tutorial addiction
- Long-term continuity

### 2. **Weekly Direction Engine**
- AI-generated weekly priorities
- Focus suggestions based on current projects
- Roadmap adjustments
- Realistic next steps

### 3. **Opportunity Radar**
- Curated hackathons, internships, fellowships
- Smart matching based on interests, skills, and level
- Why it matches you

### 4. **Progress Timeline**
- Visual engineering growth timeline
- Projects, goals, milestones
- Proof that your mentor remembers your journey

### 5. **Onboarding Flow**
- Conversational setup experience
- Journey Snapshot summary card
- Persistent profile in Supabase

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Backend**: Supabase (Auth + Database)
- **AI**: OpenAI API
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── auth/
│   │   ├── signin/          # Sign in page
│   │   └── signup/          # Sign up page
│   ├── onboarding/          # Onboarding flow
│   ├── dashboard/
│   │   ├── layout.tsx       # Dashboard sidebar layout
│   │   ├── mentor/          # Mentor chat
│   │   ├── direction/       # Weekly direction
│   │   ├── opportunities/   # Opportunity radar
│   │   ├── timeline/        # Progress timeline
│   │   └── profile/         # User profile
│   └── api/                 # API routes
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Layout components
│   ├── mentor/              # Mentor-related components
│   ├── dashboard/           # Dashboard components
│   └── onboarding/          # Onboarding components
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript type definitions
├── services/               # API service layer
├── hooks/                  # Custom React hooks
├── constants/              # App constants
└── globals.css             # Global styles
```

## Design Principles

### Visual Style
- Soft, breathable layouts
- Minimal and focused
- Premium startup quality
- Modern typography
- Subtle shadows
- Excellent spacing
- Rounded corners (rounded-xl or rounded-2xl)

### Color Palette
- Neutral backgrounds
- Subtle accents
- Premium minimalism
- Dark/light mode support

### Animations
- Elegant and subtle
- Framer Motion for:
  - Fade-ins
  - Stagger reveals
  - Smooth transitions
  - Hover states
  - Loading states
- Non-excessive, premium feel

### Inspiration
- Linear
- Notion
- Arc Browser
- Raycast
- Apple
- Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone <repo>
cd northstar
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.local.example .env.local
```

Fill in your environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_APP_URL`

4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## MVP Priority Order

1. ✅ Landing Page
2. ✅ Auth (Supabase)
3. ✅ Dashboard Shell
4. ✅ Threaded Mentor Chat
5. ✅ Onboarding Flow
6. ✅ Weekly Direction
7. ✅ Opportunity Radar
8. ✅ Progress Timeline
9. ⏳ Final polish and animations
10. ⏳ Supabase database setup
11. ⏳ OpenAI API integration

## Database Schema (Supabase)

### Users
- id (UUID)
- email (String)
- name (String)
- avatarUrl (String)
- createdAt (Timestamp)
- updatedAt (Timestamp)

### UserProfiles
- id (UUID)
- userId (UUID)
- yearOfStudy (Number)
- currentTechStack (JSON)
- technicalInterests (JSON)
- currentLearningPhase (String)
- biggestStruggle (String)
- dreamRole (String)
- currentProject (String)
- confidenceLevel (Number)
- onboardingCompleted (Boolean)
- createdAt (Timestamp)
- updatedAt (Timestamp)

### Threads
- id (UUID)
- userId (UUID)
- title (String)
- description (String)
- createdAt (Timestamp)
- updatedAt (Timestamp)

### Messages
- id (UUID)
- threadId (UUID)
- role (String: 'user' | 'assistant')
- content (Text)
- createdAt (Timestamp)

### Opportunities
- id (UUID)
- title (String)
- description (String)
- type (String)
- tags (JSON)
- difficultyLevel (String)
- deadline (Date)
- link (String)
- createdAt (Timestamp)

### TimelineEvents
- id (UUID)
- userId (UUID)
- type (String)
- title (String)
- description (String)
- date (Date)
- tags (JSON)
- createdAt (Timestamp)

### WeeklyDirections
- id (UUID)
- userId (UUID)
- week (String)
- priorities (JSON)
- focusSuggestions (JSON)
- roadmapAdjustments (JSON)
- projectGoals (JSON)
- skillRecommendations (JSON)
- productivityWarnings (JSON)
- nextSteps (JSON)
- createdAt (Timestamp)

## API Endpoints (To be implemented)

### Authentication
- `POST /api/auth/signup` - Sign up
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/logout` - Logout

### Mentor Chat
- `POST /api/mentor/message` - Send message
- `GET /api/mentor/threads` - Get all threads
- `GET /api/mentor/threads/:id` - Get thread messages
- `POST /api/mentor/threads` - Create thread

### Weekly Direction
- `GET /api/direction/this-week` - Get this week's direction
- `POST /api/direction/generate` - Generate weekly direction

### Opportunities
- `GET /api/opportunities` - Get all opportunities
- `GET /api/opportunities/recommended` - Get recommended opportunities
- `POST /api/opportunities/:id/save` - Save opportunity

### Timeline
- `GET /api/timeline` - Get all events
- `POST /api/timeline` - Create event

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile

## Mentor AI Personality

The mentor should:
- ✅ Remember context from previous conversations
- ✅ Reference previous struggles and achievements
- ✅ Reduce overwhelm and encourage shipping
- ✅ Discourage tutorial addiction
- ✅ Guide technical decisions practically
- ✅ Provide emotional reassurance
- ✅ Maintain realistic honesty
- ✅ Sound calm, practical, experienced
- ✅ Feel human-like, not robotic

The mentor should NOT:
- ❌ Sound corporate or overly motivational
- ❌ Give generic ChatGPT responses
- ❌ Overwhelm with options
- ❌ Encourage endless learning
- ❌ Sound robotic or artificial

## Performance & UX

- Fast page loads with optimized images
- Smooth animations (using Framer Motion)
- Responsive mobile design
- Dark/light mode support
- Accessible components
- Proper error handling
- Loading states

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

## Contributing

This is a hackathon MVP. Fast iteration and polished UX are priorities over perfect code.

## License

Proprietary - Northstar MVP
