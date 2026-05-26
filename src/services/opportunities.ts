import { supabase } from '@/lib/supabase'
import type { Opportunity, OpportunityRecommendation } from '@/types'

export const opportunityService = {
  async getAllOpportunities(): Promise<Opportunity[]> {
    // TODO: Implement Supabase query
    console.log('Fetching all opportunities')
    return []
  },

  async getRecommendedOpportunities(userId: string): Promise<OpportunityRecommendation[]> {
    // TODO: Get user profile, then match opportunities based on interests, level, tech stack
    console.log('Fetching recommended opportunities for user:', userId)
    return []
  },

  async saveOpportunity(userId: string, opportunityId: string) {
    // TODO: Implement Supabase insert
    console.log('Saving opportunity:', { userId, opportunityId })
  },

  async getSavedOpportunities(userId: string): Promise<Opportunity[]> {
    // TODO: Implement Supabase query
    console.log('Fetching saved opportunities for user:', userId)
    return []
  },
}
