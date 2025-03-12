'use client'

import {
  Activity,
  EllipsisIcon,
  Globe,
  LockKeyholeIcon,
  MessageSquare,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNowStrict } from 'date-fns'

import { Skeleton } from '@/components/ui/skeleton'

type FormItemProps = {
  id: number
  formId: string
  name: string
  description: string
  views: number
  backgroundColor?: string
  published: boolean
  responses: number
  createdAt: Date
}

export function FormItem({
  description,
  formId,
  id,
  name,
  views = 0,
  published = false,
  responses = 0,
  createdAt,
}: FormItemProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/dashboard/form/builder/${formId}`)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full h-auto outline-none focus-within:outline-primary focus-within:rounded-t-xl focus-within:outline-[0.5px]"
    >
      <div className="w-full relative flex group items-center justify-center overflow-hidden h-[150px] rounded-t-xl border border-gray-300 bg-gradient-to-t from-primary/10 to-primary/10">
        <div className="w-36 absolute bottom-0 flex flex-col items-center pt-6 px-4 h-32 rounded-t-xl bg-white shadow-lg">
          <h5 className="text-sm font-medium mb-1 text-center text-gray-400 truncate block w-[200px]">
            {name}
          </h5>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`skeleton-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                i
              }`}
              className="flex items-center gap-1 mb-2"
            >
              <Skeleton className="size-3 rounded-full shrink-0" />
              <Skeleton className="h-[11px] w-[75px]" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full py-0">
        <div className="flex w-full items-center justify-between py-1">
          <span className="text-sm font-medium flex items-center gap-1">
            {published ? (
              <Globe className="size-3 text-muted-foreground" />
            ) : (
              <LockKeyholeIcon className="size-3 text-muted-foreground" />
            )}
            {name}
          </span>
          <EllipsisIcon className="text-gray-700 size-4" />
        </div>

        <div className="flex w-full items-center justify-between py-1 border-t border-gray-300">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground items-center flex gap-1 text-[14px]">
              {responses}
              <MessageSquare className="size-3" />
            </span>

            <span className="text-muted-foreground items-center flex gap-1 text-[14px]">
              {views}
              <Activity className="size-3" />
            </span>
          </div>

          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            {formatDistanceToNowStrict(new Date(createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </button>
  )
}

export function FormListSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => (
    <div
      key={`skeleton-grid-${
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        i
      }`}
      className="space-y-2"
    >
      <Skeleton className="w-full h-[150px] rounded-t-xl" />
      <div className="space-y-2">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-full h-3" />
      </div>
    </div>
  ))
}
