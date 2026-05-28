import { createSupabaseRouteClient } from '@/lib/supabase/route'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a senior software engineer mentoring an ambitious engineering student. Your tone is calm, practical, emotionally intelligent, and honest. You are NOT a corporate chatbot.

Guidelines:
- Reference what they've shared about their journey, struggles, and goals
- Encourage shipping real projects over consuming tutorials
- Give realistic, actionable advice — not platitudes
- Be honest about difficulty but supportive of their growth
- Help reduce overwhelm by breaking things down
- Sound like a human mentor, not a textbook
- Keep responses concise (2-4 paragraphs max)
- Use markdown for structure when helpful
- NEVER generate code without explaining the concept first`

const DEFAULT_FALLBACK_MODELS: string[] = []

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
]

const GENERATION_CONFIG = {
  maxOutputTokens: 1024,
  temperature: 0.7,
}

type ChatGenerationError = {
  status: number
  code: string
  message: string
  retryAfterSeconds?: number
  attempts: { modelName: string; status: number; errorMessage: string }[]
}

const MENTOR_FALLBACK_RESPONSE =
  "You mentioned earlier that you're trying to learn React while also feeling overwhelmed by tutorials. Instead of jumping between resources, focus on building one small project end-to-end this week."

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey?.trim()) return null
  return new GoogleGenerativeAI(apiKey)
}

const discoverModels = async (): Promise<string[]> => {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey?.trim()) return []

  const apiVersions = ['v1beta', 'v1']
  for (const version of apiVersions) {
    try {
      const url = `https://generativelanguage.googleapis.com/${version}/models?key=${apiKey}`
      const res = await fetch(url)
      if (!res.ok) {
        console.warn(`[Gemini] Failed to list models (${version}): ${res.status}`)
        continue
      }
      const data = await res.json()
      const models: { name: string; supportedGenerationMethods: string[] }[] = data.models || []

      const generateContentModels = models
        .filter((m) => m.supportedGenerationMethods?.includes('generateContent'))
        .map((m) => m.name.replace('models/', ''))

      const scored = generateContentModels.map((name) => {
        const lower = name.toLowerCase()
        let score = 0
        if (lower.includes('flash')) score += 4
        if (lower.includes('fast')) score += 3
        if (lower.includes('lightweight') || lower.includes('lite')) score += 2
        if (lower.includes('pro')) score -= 1
        return { name, score }
      })
      scored.sort((a, b) => b.score - a.score)

      const sorted = scored.map((s) => s.name)
      console.log(`[Gemini] Available generateContent models (${version}):`, sorted)
      return sorted
    } catch (e) {
      console.warn(`[Gemini] Exception listing models (${version}):`, e)
    }
  }

  return []
}

const parseRetryAfterSeconds = (text: string) => {
  const match = text.match(/retry in (\d+)(?:\.\d+)?s/i)
  return match ? Number(match[1]) : undefined
}

const classifyModelError = (text: string) => {
  if (text.includes('429') || text.toLowerCase().includes('quota')) {
    return {
      status: 429,
      code: 'GEMINI_QUOTA_EXCEEDED',
      message: 'AI quota exceeded for Gemini API. Check your quota/billing and retry.',
      retryAfterSeconds: parseRetryAfterSeconds(text),
      canFallback: true,
    }
  }
  if (text.includes('404') || text.toLowerCase().includes('not found') || text.toLowerCase().includes('not supported')) {
    return {
      status: 503,
      code: 'GEMINI_MODEL_UNAVAILABLE',
      message: 'Configured Gemini model is unavailable for this API version.',
      canFallback: true,
    }
  }
  return {
    status: 500,
    code: 'GEMINI_GENERATION_FAILED',
    message: 'Failed to generate response',
    canFallback: true,
  }
}

async function generateWithFallback(
  message: string,
  history: { role: string; content: string }[]
) {
  const client = getGeminiClient()
  if (!client) {
    throw {
      status: 503,
      code: 'GEMINI_API_KEY_MISSING',
      message: 'Gemini API key is missing.',
      attempts: [],
    } as ChatGenerationError
  }

  const attempts: { modelName: string; status: number; errorMessage: string }[] = []
  let bestError: Omit<ChatGenerationError, 'attempts'> | null = null

  const models = await discoverModels()
  const modelsToTry = models.length > 0 ? models : DEFAULT_FALLBACK_MODELS
  console.log(`[Gemini] Trying models: ${modelsToTry.length > 0 ? modelsToTry.join(', ') : '(none)'}`)

  for (const modelName of modelsToTry) {
    try {
      // #region agent log
      fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
        body: JSON.stringify({
          sessionId: 'ce31a0',
          runId: 'post-fix',
          hypothesisId: 'H6',
          location: 'src/app/api/chat/route.ts:generateWithFallback',
          message: 'trying gemini model',
          data: { modelName },
          timestamp: Date.now(),
        }),
      }).catch(() => {})
      // #endregion

      const model = client.getGenerativeModel({
        model: modelName,
        safetySettings: SAFETY_SETTINGS,
        generationConfig: GENERATION_CONFIG,
      })
      const recentHistory = history.length > 30 ? history.slice(-30) : history
      const chat = model.startChat({
        systemInstruction: {
          role: 'system',
          parts: [{ text: SYSTEM_PROMPT }],
        },
        history: recentHistory.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
      })

      const result = await chat.sendMessage(message)
      return { response: result.response.text(), modelName }
    } catch (error) {
      const text = (error as any)?.message || ''
      const classification = classifyModelError(text)
      console.warn(`[Gemini] Model ${modelName} failed: [${classification.code}] ${text.slice(0, 200)}`)
      attempts.push({ modelName, status: classification.status, errorMessage: text })
      if (!bestError || classification.status === 429) {
        bestError = classification
      }

      // #region agent log
      fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
        body: JSON.stringify({
          sessionId: 'ce31a0',
          runId: 'post-fix',
          hypothesisId: 'H6',
          location: 'src/app/api/chat/route.ts:generateWithFallback',
          message: 'gemini model failed',
          data: {
            modelName,
            canFallback: classification.canFallback,
            status: classification.status,
            errorCode: classification.code,
            errorMessage: text,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {})
      // #endregion

      if (!classification.canFallback) {
        break
      }
    }
  }

  const finalError: ChatGenerationError = {
    status: bestError?.status ?? 500,
    code: bestError?.code ?? 'GEMINI_GENERATION_FAILED',
    message: bestError?.message ?? 'Failed to generate response',
    retryAfterSeconds: bestError?.retryAfterSeconds,
    attempts,
  }

  // #region agent log
  fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
    body: JSON.stringify({
      sessionId: 'ce31a0',
      runId: 'post-fix',
      hypothesisId: 'H6',
      location: 'src/app/api/chat/route.ts:generateWithFallback',
      message: 'gemini fallback exhausted',
      data: finalError,
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion

  throw finalError
}

export async function POST(req: Request) {
  try {
    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'pre-fix',
        hypothesisId: 'H3',
        location: 'src/app/api/chat/route.ts:POST',
        message: 'chat route hit',
        data: { hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY) },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion

    const supabase = await createSupabaseRouteClient()
    const { data: { session } } = await supabase.auth.getSession()
    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'pre-fix',
        hypothesisId: 'H2',
        location: 'src/app/api/chat/route.ts:POST',
        message: 'session checked',
        data: { hasSession: Boolean(session) },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { message, threadId } = await req.json()
    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'pre-fix',
        hypothesisId: 'H3',
        location: 'src/app/api/chat/route.ts:POST',
        message: 'request body parsed',
        data: { messageLength: typeof message === 'string' ? message.length : null, hasThreadId: Boolean(threadId) },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
    if (!message?.trim()) return NextResponse.json({ error: 'Message required' }, { status: 400 })

    let thread_id = threadId
    let history: { role: string; content: string }[] = []

    if (thread_id) {
      const { data: messages } = await supabase
        .from('messages')
        .select('role, content')
        .eq('thread_id', thread_id)
        .order('created_at', { ascending: true })
      if (messages) history = messages
    } else {
      const { data: thread } = await supabase
        .from('threads')
        .insert({
          user_id: session.user.id,
          title: message.slice(0, 60),
          description: message.slice(0, 100),
        })
        .select()
        .single()
      if (thread) thread_id = thread.id
    }

    let response = ''
    let modelName: string | null = null
    let warning: string | null = null

    try {
      const generation = await generateWithFallback(message, history)
      response = generation.response
      modelName = generation.modelName
    } catch (error) {
      const parsedError =
        typeof error === 'object' && error !== null
          ? (error as Partial<ChatGenerationError>)
          : {}
      const errorCode =
        parsedError.code ??
        (error instanceof Error && 'code' in error ? String((error as Error & { code?: string }).code) : undefined)
      const fallbackFriendlyCodes = new Set([
        'GEMINI_QUOTA_EXCEEDED',
        'GEMINI_MODEL_UNAVAILABLE',
        'GEMINI_API_KEY_MISSING',
        'GEMINI_GENERATION_FAILED',
      ])

      if (fallbackFriendlyCodes.has(errorCode || '')) {
        const attemptCount = Array.isArray(parsedError.attempts) ? parsedError.attempts.length : 0
        console.warn(`[Gemini] Using fallback response. code=${errorCode} attempts=${attemptCount}`)
        response = MENTOR_FALLBACK_RESPONSE
        warning =
          errorCode === 'GEMINI_API_KEY_MISSING'
            ? 'AI is temporarily unavailable. Showing a mentor fallback so you can continue.'
            : errorCode === 'GEMINI_QUOTA_EXCEEDED'
              ? 'Gemini quota was exceeded. Showing a mentor fallback response.'
              : 'Mentor AI is currently unstable. Showing a fallback response.'
      } else {
        throw error
      }
    }

    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'pre-fix',
        hypothesisId: 'H3',
        location: 'src/app/api/chat/route.ts:POST',
        message: 'gemini responded',
        data: {
          responseLength: typeof response === 'string' ? response.length : null,
          hasThreadId: Boolean(thread_id),
          modelName,
          usedFallback: warning !== null,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion

    if (thread_id) {
      await supabase.from('messages').insert([
        { thread_id, role: 'user', content: message },
        { thread_id, role: 'assistant', content: response },
      ])
      const { count } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('thread_id', thread_id)
      await supabase
        .from('threads')
        .update({ message_count: count || 0, updated_at: new Date().toISOString() })
        .eq('id', thread_id)
    }

    return NextResponse.json({ message: response, threadId: thread_id, warning, modelName })
  } catch (error) {
    console.error('Chat error:', error)
    const parsedError =
      typeof error === 'object' && error !== null
        ? (error as Partial<ChatGenerationError>)
        : {}
    const errorCode = parsedError?.code || 'CHAT_ROUTE_ERROR'
    const fallbackFriendlyCodes = new Set([
      'GEMINI_QUOTA_EXCEEDED',
      'GEMINI_MODEL_UNAVAILABLE',
      'GEMINI_API_KEY_MISSING',
      'GEMINI_GENERATION_FAILED',
    ])

    if (fallbackFriendlyCodes.has(errorCode)) {
      const warning =
        errorCode === 'GEMINI_API_KEY_MISSING'
          ? 'AI is temporarily unavailable. Showing a mentor fallback so you can continue.'
          : errorCode === 'GEMINI_QUOTA_EXCEEDED'
            ? 'Gemini quota was exceeded. Showing a mentor fallback response.'
            : 'Mentor AI is currently unstable. Showing a fallback response.'
      return NextResponse.json({
        message: MENTOR_FALLBACK_RESPONSE,
        threadId: null,
        warning,
        modelName: null,
      })
    }

    const status = parsedError?.status || 500
    const errorMessage = parsedError?.message || 'Failed to generate response'
    const retryAfterSeconds = parsedError?.retryAfterSeconds
    const attempts = Array.isArray(parsedError?.attempts) ? parsedError.attempts : []
    // #region agent log
    fetch('http://127.0.0.1:7782/ingest/186ebea2-15bd-4fb3-93ff-4bcf057ea2dc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'ce31a0' },
      body: JSON.stringify({
        sessionId: 'ce31a0',
        runId: 'pre-fix',
        hypothesisId: 'H3',
        location: 'src/app/api/chat/route.ts:catch',
        message: 'chat route error caught',
        data: { errorName: (error as any)?.name, errorMessage: (error as any)?.message, status, errorCode, attempts },
        timestamp: Date.now(),
      }),
    }).catch(() => {})
    // #endregion
    return NextResponse.json({ error: errorMessage, errorCode, retryAfterSeconds, attempts }, { status })
  }
}

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY
  const result: Record<string, unknown> = {
    hasApiKey: Boolean(apiKey?.trim()),
  }

  if (apiKey?.trim()) {
    try {
      const models = await discoverModels()
      result.models = models
      result.modelCount = models.length
    } catch (e: unknown) {
      result.error = e instanceof Error ? e.message : String(e)
    }
  } else {
    result.error = 'GEMINI_API_KEY environment variable is not set'
  }

  return NextResponse.json(result)
}
