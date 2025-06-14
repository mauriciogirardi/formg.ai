'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useBuilder } from '@/context/builder-provider'
import { cn } from '@/lib/utils'
import { FileTextIcon, Home } from 'lucide-react'
import { type ComponentProps, useState } from 'react'
import { FormBlockBox } from './form-block-box'
import { FormSettings } from './form-settings'

type BuilderSidebarProps = ComponentProps<typeof Sidebar>

export function BuilderSidebar({ ...rest }: BuilderSidebarProps) {
  const [tab, setTab] = useState<'blocks' | 'settings'>('blocks')
  const { formData, loading } = useBuilder()

  return (
    <Sidebar className="border-r left-12 pt-16" {...rest}>
      <SidebarHeader className="bg-white px-0">
        <header className="border-b border-gray-200 w-full pt-1 pb-2 flex flex-shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <Home className="-ml-1 size-4" />
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
                        {formData?.name || 'Untitled'}
                      </h5>
                    )}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </SidebarHeader>

      <SidebarContent className="pt-2 px-5 bg-white">
        <div className="w-full">
          <div className="w-full rounded-full bg-gray-100 p-1 flex flex-row gap-1 h-[39px]">
            <button
              type="button"
              className={cn(
                'p-[5px] flex-1 bg-transparent transition-colors ease-in-out rounded-full text-center font-medium text-sm',
                tab === 'blocks' && 'bg-white'
              )}
              onClick={() => setTab('blocks')}
            >
              Blocks
            </button>
            <button
              type="button"
              className={cn(
                'p-[5px] flex-1 bg-transparent transition-colors ease-in-out rounded-full text-center font-medium text-sm',
                tab === 'settings' && 'bg-white'
              )}
              onClick={() => setTab('settings')}
            >
              Settings
            </button>
          </div>

          {tab === 'blocks' && <FormBlockBox />}
          {tab === 'settings' && <FormSettings />}
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
