import { fetchFormStats } from '@/actions/form-action'
import { StatsCard } from './stats-card'

export async function StatsListWrap() {
  const stats = await fetchFormStats()
  return <StatsCard loading={false} data={stats} />
}
