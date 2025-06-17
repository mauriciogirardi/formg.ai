'use client'

import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useBuilder } from '@/context/builder-provider'
import { InfoIcon } from 'lucide-react'
import { type ComponentProps, useState } from 'react'
import { FormBlockBox } from './form-block-box'
import { FromBlockBreadcrumb } from './form-block-breadcrumb'
import { FormSettings } from './form-settings'
import { Tag, TagButtons } from './tag-buttons'

type BuilderSidebarProps = ComponentProps<typeof Sidebar>

export function BuilderSidebar({ ...rest }: BuilderSidebarProps) {
  const [tab, setTab] = useState<Tag>(Tag.blocks)
  const { formData, loading } = useBuilder()

  return (
    <Sidebar className="border-r left-12 pt-16" {...rest}>
      <SidebarHeader className="bg-white px-0">
        <FromBlockBreadcrumb loading={loading} name={formData?.name} />
      </SidebarHeader>

      <SidebarContent className="pt-2 px-5 bg-white">
        <div className="w-full">
          <TagButtons
            tab={tab}
            onClickBlocks={setTab}
            onClickSettings={setTab}
          />

          {tab === Tag.blocks && (
            <>
              <FormBlockBox />

              {formData?.published && (
                <div className="absolute bottom-10 right-5">
                  <Tooltip>
                    <TooltipTrigger className="absolute cursor-pointer -top-4 -left-4">
                      <InfoIcon className="size-5 text-rose-600" />
                    </TooltipTrigger>
                    <TooltipContent className="w-[200px]">
                      <p>
                        ⚠️ The form is currently published. Please unpublish it
                        before making any modifications.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
            </>
          )}
          {tab === Tag.settings && <FormSettings />}
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
