'use client'

import { formatDistanceToNowStrict } from 'date-fns'
import {
  Activity,
  EllipsisIcon,
  Globe,
  LockKeyholeIcon,
  MessageSquare,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

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
      className="w-full h-auto outline-none focus-within:outline-primary focus-within:rounded-t-xl focus-within:outline-[0.5px] pb-4 px-2 rounded-md border border-purple-100 hover:shadow-sm bg-purple-50"
    >
      <div className="w-full relative flex group items-center justify-center overflow-hidden h-[150px] rounded-t-xl">
        <div className="w-full absolute bottom-0 flex flex-col items-center pt-6 px-4 h-32 rounded-t-xl bg-white shadow-lg">
          <h5 className="text-sm font-medium mb-1 text-center text-gray-600 truncate block w-full">
            {name}
          </h5>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`skeleton-${String(i)}`}
              className="flex items-center gap-1 mb-2"
            >
              <Skeleton className="size-3 rounded-full shrink-0" />
              <Skeleton className="h-[11px] w-[75px]" />
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-4 bg-gray-200 w-6 h-6 shadow-xl rounded-full flex items-center justify-center">
          {published ? (
            <Globe className="size-3 text-emerald-700" />
          ) : (
            <LockKeyholeIcon className="size-3 text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="w-full py-0 pt-4">
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
