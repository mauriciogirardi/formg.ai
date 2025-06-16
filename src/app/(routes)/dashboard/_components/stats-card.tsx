import type { fetchFormStats } from '@/actions/form-action'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Stats } from './stats'

type StatsCard = {
  loading: boolean
  data: Awaited<ReturnType<typeof fetchFormStats>>
}

export function StatsCard({ data, loading }: StatsCard) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Total Forms</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Skeleton className="h-[36px] w-16" />
            ) : (
              <Stats amount={data?.totalForms} />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            All forms created on your account
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Total Responses</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Skeleton className="h-[36px] w-16" />
            ) : (
              <Stats amount={data?.totalResponses} />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            Responses submitted for your forms
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Conversion Rate</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Skeleton className="h-[36px] w-20" />
            ) : (
              <Stats amount={data?.conversionRate} percent />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            % of views that resulted in responses
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardDescription>Engagement Rate</CardDescription>
          <CardTitle className="text-4xl">
            {loading ? (
              <Skeleton className="h-[36px] w-20" />
            ) : (
              <Stats amount={data?.engagementRate} percent />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            % of views that received responses
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
