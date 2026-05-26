import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
const supabase = createClientComponentClient()
import type { TimelineEvent } from '@/types'

export const timelineService = {
  async getTimeline(userId: string): Promise<TimelineEvent[]> {
    // TODO: Implement Supabase query ordered by date
    console.log('Fetching timeline for user:', userId)
    return []
  },

  async createEvent(userId: string, event: Omit<TimelineEvent, 'id'>): Promise<TimelineEvent> {
    // TODO: Implement Supabase insert
    console.log('Creating timeline event:', { userId, event })
    const { userId: _u, ...eventData } = event
    return { id: Date.now().toString(), userId, ...eventData }
  },

  async deleteEvent(eventId: string) {
    // TODO: Implement Supabase delete
    console.log('Deleting timeline event:', eventId)
  },

  async updateEvent(eventId: string, event: Partial<TimelineEvent>) {
    // TODO: Implement Supabase update
    console.log('Updating timeline event:', { eventId, event })
  },
}
