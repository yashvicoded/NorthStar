import type { Opportunity } from '@/types'

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Google Summer of Code 2024',
    description:
      'Contribute to open-source projects during summer. Gain experience, mentorship, and a stipend.',
    type: 'open-source',
    tags: ['open-source', 'mentorship', 'stipend', 'summer'],
    difficultyLevel: 'intermediate',
    deadline: '2024-12-31',
    link: 'https://summerofcode.withgoogle.com',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Y Combinator Startup School',
    description:
      'Learn how to build and launch your startup. Free online course with lessons from YC founders.',
    type: 'fellowship',
    tags: ['startup', 'founders', 'learning', 'entrepreneurship'],
    difficultyLevel: 'beginner',
    deadline: '2024-06-30',
    link: 'https://www.startupschool.org',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'TechCrunch Disrupt Hackathon',
    description:
      'Build innovative products with other founders. Network with investors and get exposure.',
    type: 'hackathon',
    tags: ['hackathon', 'networking', 'innovation', 'investors'],
    difficultyLevel: 'intermediate',
    deadline: '2024-09-15',
    link: 'https://techcrunch.com/events/disrupt',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Jane Street Internship Program',
    description:
      'Quant trading internship. Great learning experience and competitive compensation.',
    type: 'internship',
    tags: ['quant', 'trading', 'internship', 'finance'],
    difficultyLevel: 'advanced',
    deadline: '2024-10-31',
    link: 'https://www.janestreet.com/careers',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Figma Design Fellowship',
    description: 'Learn product design from industry experts. Build portfolio-worthy projects.',
    type: 'fellowship',
    tags: ['design', 'product', 'learning', 'portfolio'],
    difficultyLevel: 'beginner',
    deadline: '2024-08-31',
    link: 'https://www.figma.com/careers',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'MLH Fellowship',
    description:
      'Open-source internship for software engineers. Work on real projects, get mentorship.',
    type: 'fellowship',
    tags: ['open-source', 'internship', 'mentorship', 'learning'],
    difficultyLevel: 'intermediate',
    deadline: '2024-07-15',
    link: 'https://fellowship.mlh.io',
    createdAt: new Date().toISOString(),
  },
]

export const TECH_STACK_OPTIONS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'Go',
  'Rust',
  'React',
  'Vue',
  'Angular',
  'Node.js',
  'Django',
  'FastAPI',
  'Spring Boot',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'AWS',
  'GCP',
  'Azure',
]

export const LEARNING_PHASE_OPTIONS = [
  'Just started learning web development',
  'Building my first projects',
  'Preparing for internships',
  'Looking to specialize in an area',
  'Contributing to open source',
  'Building a side project/startup',
  'Transitioning to a new tech stack',
]

export const INTERESTS_OPTIONS = [
  'Web Development',
  'Mobile Development',
  'Machine Learning',
  'DevOps',
  'Security',
  'Data Engineering',
  'Cloud Architecture',
  'Game Development',
  'Systems Design',
  'Product Management',
  'Startups',
]

export const NAVIGATION_ITEMS = [
  { label: 'Mentor', href: '/dashboard/mentor', icon: 'MessageSquare' },
  { label: 'This Week', href: '/dashboard/direction', icon: 'Calendar' },
  { label: 'Opportunities', href: '/dashboard/opportunities', icon: 'Zap' },
  { label: 'Timeline', href: '/dashboard/timeline', icon: 'TrendingUp' },
  { label: 'Profile', href: '/dashboard/profile', icon: 'User' },
]
