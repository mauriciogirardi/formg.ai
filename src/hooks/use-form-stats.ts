import type { FormStatsResponse } from '@/api/form-stars-api'
import { useQuery } from '@tanstack/react-query'

export function useFormStats() {
  return useQuery<FormStatsResponse>({
    queryKey: ['formStats'],
    queryFn: async () => {
      const res = await fetch('/api/form-stats')
      if (!res.ok) throw new Error('Failed to fetch form stats')
      return res.json()
    },
  })
}
