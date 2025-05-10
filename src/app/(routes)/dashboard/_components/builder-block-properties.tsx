'use client'

import { Button } from '@/components/ui/button'
import { useBuilder } from '@/context/builder-provider'
import { FormBlocks } from '@/lib/form-blocks'
import { MousePointerClick, SaveIcon, SendIcon } from 'lucide-react'
import { PreviewDialog } from './preview-dialog'

export function BuilderBlockProperties() {
  const { selectedBlockLayout } = useBuilder()

  const LayoutPropertyBlock =
    selectedBlockLayout &&
    FormBlocks[selectedBlockLayout.blockType].propertiesComponent

  return (
    <div className="relative w-[320px] hidden xl:flex">
      <div className="fixed right-0 w-[320px] bg-white border-l shadow-sm h-screen pb-36 mt-0 scrollbar overflow-auto">
        <div className="flex flex-col w-full items-center h-auto min-h-full">
          <div className="w-full flex items-center bg-white pb-2 pt-3 sticky border-b border-gray-200 top-0 gap-2 px-2">
            <PreviewDialog />
            <Button
              size="sm"
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white"
            >
              <SaveIcon />
              Save
            </Button>
            <Button size="sm">
              <SendIcon />
              Publish
            </Button>
          </div>

          {!selectedBlockLayout ? (
            <div className="w-full flex items-center justify-center h-[calc(100vh_-_200px)]">
              <div className="text-gray-400 gap-1 text-center text-sm w-full flex flex-col items-center justify-center">
                <MousePointerClick size={28} />
                <p>Click the layout to modify block</p>
              </div>
            </div>
          ) : (
            <div className="w-full p-1">
              <div className="px-2 py-3 border-b border-gray-200">
                <h5 className="text-left font-medium text-sm">
                  Layout Block Properties
                </h5>

                {LayoutPropertyBlock && (
                  <LayoutPropertyBlock blockInstance={selectedBlockLayout} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
