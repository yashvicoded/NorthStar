import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

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

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { message, threadId } = await req.json()
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

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const chat = model.startChat({
      systemInstruction: SYSTEM_PROMPT,
      history: history.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
    })

    const result = await chat.sendMessage(message)
    const response = result.response.text()

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

    return NextResponse.json({ message: response, threadId: thread_id })
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
  }
}
