import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { FileTextIcon, HomeIcon } from 'lucide-react'

type FromBlockBreadcrumbProps = {
  name?: string
  loading?: boolean
}

export function FromBlockBreadcrumb({
  name,
  loading = false,
}: FromBlockBreadcrumbProps) {
  return (
    <div className="border-b border-gray-200 w-full pt-1 pb-2 flex flex-shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <HomeIcon className="-ml-1 size-4" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden: md:block">
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1">
                <FileTextIcon className="size-4 mb-[3px]" />
                {loading ? (
                  <Skeleton className="w-[110px] h-4" />
                ) : (
                  <h5 className="truncate flex w-[110px] text-sm">
                    {name || 'Untitled'}
                  </h5>
                )}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}
