import { createSupabaseRouteClient } from '@/lib/supabase/route'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
]

const DEFAULT_MODELS = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash']

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey?.trim()) return null
  return new GoogleGenerativeAI(apiKey)
}

const discoverModels = async (): Promise<string[]> => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey?.trim()) return []

  for (const version of ['v1beta', 'v1']) {
    try {
      const url = `https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`
      const res = await fetch(url)
      if (!res.ok) continue

      const data = await res.json()
      const models: { name: string; supportedGenerationMethods?: string[] }[] = data.models || []
      const generateContentModels = models
        .filter((m) => m.supportedGenerationMethods?.includes('generateContent'))
        .map((m) => m.name.replace('models/', ''))

      if (generateContentModels.length > 0) return generateContentModels
    } catch {
      // try next API version
    }
  }

  return []
}

const mockDirectionFromProfile = (profile: Record<string, unknown> | null) => {
  const stack =
    Array.isArray(profile?.tech_stack) && profile.tech_stack.length > 0
      ? String(profile.tech_stack[0])
      : 'your core stack'

  return {
    priorities: [
      `Ship one small ${stack} project milestone by Friday.`,
      'Block 60 minutes daily for focused build time before tutorials.',
      'Write down one learning win and one blocker after each session.',
    ],
    focus_suggestions: [
      'Pick one resource and commit to it for this week.',
      'Convert one concept into a real feature the same day.',
      'Schedule a short review session to cut scope and reduce overwhelm.',
    ],
    roadmap_adjustments: [
      'Pause new course hopping for 7 days.',
      'Prioritize implementation reps over passive content.',
    ],
    project_goals: [
      'Finish one meaningful feature end-to-end.',
      'Add basic validation and error states to your project flow.',
      'Publish a short progress update for accountability.',
    ],
    skill_recommendations: ['State management fundamentals', 'Debugging with logs and network traces'],
    productivity_warnings: [
      'Too many resources can feel productive but slow real progress.',
      'Perfectionism may block shipping; aim for complete, not perfect.',
    ],
    next_steps: [
      'Mon: Define one clear feature scope.',
      'Tue: Build the happy-path UI and interaction.',
      'Wed: Connect persistence and test edge cases.',
      'Thu: Polish copy, spacing, and visual hierarchy.',
      'Fri: Demo to a friend and capture feedback.',
    ],
  }
}

const normalizeDirectionPayload = (raw: Record<string, unknown>) => ({
  priorities: (raw?.priorities as string[]) ?? [],
  focus_suggestions: (raw?.focus_suggestions as string[]) ?? (raw?.focusSuggestions as string[]) ?? [],
  roadmap_adjustments:
    (raw?.roadmap_adjustments as string[]) ?? (raw?.roadmapAdjustments as string[]) ?? [],
  project_goals: (raw?.project_goals as string[]) ?? (raw?.projectGoals as string[]) ?? [],
  skill_recommendations:
    (raw?.skill_recommendations as string[]) ?? (raw?.skillRecommendations as string[]) ?? [],
  productivity_warnings:
    (raw?.productivity_warnings as string[]) ?? (raw?.productivityWarnings as string[]) ?? [],
  next_steps: (raw?.next_steps as string[]) ?? (raw?.nextSteps as string[]) ?? [],
})

async function generateDirectionWithGemini(prompt: string) {
  const client = getGeminiClient()
  if (!client) return null

  const discovered = await discoverModels()
  const modelsToTry = discovered.length > 0 ? discovered : DEFAULT_MODELS

  for (const modelName of modelsToTry) {
    try {
      const model = client.getGenerativeModel({
        model: modelName,
        safetySettings: SAFETY_SETTINGS,
        generationConfig: {
          maxOutputTokens: 1024,
          temperature: 0.7,
        },
      })
      const result = await model.generateContent(prompt)
      const text = result.response.text()
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      return normalizeDirectionPayload(JSON.parse(cleaned) as Record<string, unknown>)
    } catch (err) {
      console.warn(`[Direction] Model ${modelName} failed:`, err)
    }
  }

  return null
}

export async function POST() {
  try {
    const supabase = await createSupabaseRouteClient()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    const prompt = `Generate a weekly direction plan for an engineering student with this profile:

Name: ${profile?.name || 'Student'}
Year: ${profile?.year_of_study || 'Unknown'}
Tech Stack: ${(profile?.tech_stack || []).join(', ')}
Interests: ${(profile?.interests || []).join(', ')}
Current Phase: ${profile?.learning_phase || 'Learning'}
Struggle: ${profile?.biggest_struggle || 'None'}
Dream Role: ${profile?.dream_role || 'Engineer'}
Current Project: ${profile?.current_project || 'None'}
Confidence: ${profile?.confidence_level || 5}/10

Return JSON with these fields:
- priorities (3 items)
- focusSuggestions (3 items)
- roadmapAdjustments (2 items)
- projectGoals (3 items)
- skillRecommendations (2 items)
- productivityWarnings (2 items, honest but supportive)
- nextSteps (5 items with realistic weekly timeline)

Make it supportive but honest. Reference their specific situation.`

    let direction = mockDirectionFromProfile(profile)
    let warning: string | null = process.env.GEMINI_API_KEY?.trim()
      ? null
      : 'Gemini key is missing. Showing a generated fallback direction for demo continuity.'

    if (process.env.GEMINI_API_KEY?.trim()) {
      const generated = await generateDirectionWithGemini(prompt)
      if (generated) {
        direction = generated
        warning = null
      } else {
        warning = 'AI direction is temporarily unavailable. Showing a practical fallback plan.'
      }
    }

    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())

    const payload = normalizeDirectionPayload(direction)
    const insertRow = {
      user_id: session.user.id,
      week_start: weekStart.toISOString().split('T')[0],
      priorities: payload.priorities,
      focus_suggestions: payload.focus_suggestions,
      roadmap_adjustments: payload.roadmap_adjustments,
      project_goals: payload.project_goals,
      skill_recommendations: payload.skill_recommendations,
      productivity_warnings: payload.productivity_warnings,
      next_steps: payload.next_steps,
    }

    const { data: saved, error: saveError } = await supabase
      .from('weekly_directions')
      .insert(insertRow)
      .select()
      .single()

    if (saveError) {
      console.error('weekly_directions insert:', saveError)
      const saveWarning = warning
        ? `${warning} (Could not save to database.)`
        : 'Direction generated but could not be saved to the database.'

      return NextResponse.json({
        direction: { ...insertRow, id: undefined },
        warning: saveWarning,
        ...(process.env.NODE_ENV === 'development' ? { details: saveError.message } : {}),
      })
    }

    return NextResponse.json({ direction: saved || insertRow, warning })
  } catch (error) {
    console.error('Direction error:', error)
    const message = error instanceof Error ? error.message : 'Failed to generate direction'
    return NextResponse.json(
      {
        error: 'Failed to generate direction',
        ...(process.env.NODE_ENV === 'development' ? { details: message } : {}),
      },
      { status: 500 }
    )
  }
}
