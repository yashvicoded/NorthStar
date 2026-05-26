# Development Guide - Northstar MVP

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.local.example .env.local
# Fill in your Supabase and OpenAI keys

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Development Workflow

### 1. Landing Page Testing
- Visit `/` to see the landing page
- Test responsive design (mobile, tablet, desktop)
- Check animations with Framer Motion

### 2. Authentication Flow (UI Only)
- `/auth/signin` - Sign in page
- `/auth/signup` - Sign up page
- (Supabase integration needed)

### 3. Onboarding (UI Only)
- `/onboarding` - 9-step setup flow
- Test form validation
- Check progress bar animation

### 4. Dashboard (UI + Mock Data)
- `/dashboard/mentor` - Mentor chat with mock messages
- `/dashboard/direction` - Weekly direction with mock data
- `/dashboard/opportunities` - Curated opportunities (static)
- `/dashboard/timeline` - Progress timeline with mock events
- `/dashboard/profile` - User profile (read-only by default)

## Key Components to Understand

### Landing Page (`src/app/page.tsx`)
- Uses Framer Motion for animations
- Sections: Hero, Problem, Features, Positioning, Testimonials, CTA
- Responsive grid layouts

### Onboarding (`src/app/onboarding/page.tsx`)
- Multi-step form using state management
- Steps: name → year → tech → interests → phase → struggle → role → project → confidence
- Progress bar animation

### Mentor Chat (`src/app/dashboard/mentor/page.tsx`)
- Two-panel layout: threads sidebar + chat area
- Mock data for realistic demo
- Message animations and typing indicator
- Auto-scroll to latest message

### Dashboard Layout (`src/app/dashboard/layout.tsx`)
- Collapsible sidebar navigation
- Responsive design (mobile-friendly)
- Navigation to all dashboard sections

## Integration Checklist (For Later)

### Supabase Setup
```
Database Tables:
- users
- user_profiles
- threads
- messages
- opportunities
- timeline_events
- weekly_directions

Authentication:
- Google OAuth
- Email/password fallback
```

### OpenAI Integration
```
In mentorService.ts:
- generateMentorResponse() should call OpenAI API
- Include conversation context for continuity
- Use system prompt for mentor personality
```

### API Routes
Create in `src/app/api/`:
```
/auth/signin
/auth/signup
/mentor/messages
/mentor/threads
/direction/generate
/opportunities/recommend
/profile
/timeline
```

## Component Library Notes

### Using shadcn/ui Components

Already implemented:
- Button (with variants: default, outline, ghost, destructive, link)
- Input
- Card (with CardHeader, CardTitle, CardDescription, CardContent, CardFooter)

To add more components:
```bash
npx shadcn-ui@latest add [component-name]
```

Popular ones to add later:
- Dialog (for modals)
- Dropdown menu
- Select
- Tabs
- Alert

### Styling with Tailwind

CSS variables are set in `src/globals.css`:
- Colors: `bg-primary`, `text-primary-foreground`
- Spacing: Use `px-4`, `py-6`, etc.
- Responsive: `sm:`, `md:`, `lg:` prefixes
- Dark mode: `.dark` class support built-in

## Animation Patterns

### Fade In + Up
```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}
```

### Stagger Container
```typescript
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}
```

### Usage
```tsx
<motion.div initial="initial" animate="animate" variants={staggerContainer}>
  {items.map((item) => (
    <motion.div key={item.id} variants={fadeInUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Common Patterns

### Form with Validation
```typescript
const [data, setData] = useState({ ... })
const isValid = () => { /* check data */ }

<Button disabled={!isValid()} onClick={handleSubmit}>
  Submit
</Button>
```

### Conditional Rendering
```typescript
{condition && (
  <motion.div>
    Conditionally rendered content
  </motion.div>
)}
```

### Loading States
```typescript
const [isLoading, setIsLoading] = useState(false)

<Button disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

## Debugging Tips

1. **React DevTools**: Inspect component tree and props
2. **Network Tab**: Check API calls (when implemented)
3. **Console**: Check for TypeScript/console errors
4. **Framer Motion**: Use `layoutId` for debugging animations
5. **Tailwind**: Use browser inspector to verify class application

## Performance Optimization

1. **Images**: Use `next/image` component
2. **Code Splitting**: Next.js does this automatically
3. **Lazy Loading**: Use `dynamic()` for heavy components
4. **Memoization**: Use `React.memo()` for pure components
5. **Animation**: Avoid animating too many elements simultaneously

## Best Practices

1. **Component Structure**:
   - Keep components small and focused
   - Extract reusable logic to custom hooks
   - Use composition over props drilling

2. **State Management**:
   - Use Zustand for global state
   - Use React hooks for local state
   - Avoid prop drilling

3. **Styling**:
   - Use Tailwind utility classes
   - Define variants in component files
   - Use CSS variables from globals.css

4. **Type Safety**:
   - Always use TypeScript types
   - Define types in `src/types/`
   - Use strict mode in tsconfig.json

5. **Performance**:
   - Minimize re-renders with proper memoization
   - Use proper loading and error states
   - Optimize animations

## Project Structure Tips

```
Feature-based folder structure for components:
src/components/
├── ui/              # Basic UI components
├── layout/          # Layout components
├── mentor/          # Mentor-specific components
├── dashboard/       # Dashboard-specific components
└── onboarding/      # Onboarding-specific components
```

## Next Phase: Backend Integration

When ready to integrate Supabase and OpenAI:

1. **Create Service Functions**: Already stubbed in `src/services/`
2. **Create API Routes**: `src/app/api/`
3. **Connect Components**: Update components to use service functions
4. **Error Handling**: Add try-catch and user feedback
5. **Loading States**: Add loading UI for all async operations

## Helpful Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Supabase Docs](https://supabase.com/docs)
- [OpenAI API](https://platform.openai.com/docs)

## Current Build Status

- ✅ **UI/UX**: 100% - All pages styled and responsive
- ⏳ **Database**: 0% - Supabase schema not created
- ⏳ **API**: 10% - Service stubs in place, no implementation
- ⏳ **AI**: 0% - OpenAI integration not started
- ⏳ **Auth**: 10% - UI complete, Supabase not integrated

## Estimated Time to MVP Completion

- Backend Setup: 2-3 hours
- Supabase Integration: 2-3 hours
- OpenAI Integration: 1-2 hours
- Testing & Polish: 2-3 hours

**Total: ~8-11 hours of development time**
