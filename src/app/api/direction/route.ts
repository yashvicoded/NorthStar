import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
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

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const direction = JSON.parse(cleaned)

    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())

    const { data: saved } = await supabase
      .from('weekly_directions')
      .insert({
        user_id: session.user.id,
        week_start: weekStart.toISOString().split('T')[0],
        ...direction,
      })
      .select()
      .single()

    return NextResponse.json({ direction: saved || direction })
  } catch (error) {
    console.error('Direction error:', error)
    return NextResponse.json({ error: 'Failed to generate direction' }, { status: 500 })
  }
}
