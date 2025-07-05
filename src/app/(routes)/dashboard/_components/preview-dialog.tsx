'use client'

import { EyeIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { defaultBackgroundColor } from '@/constants'
import { FormBlocks } from '@/lib/form-blocks'
import { useBuilderStore } from '@/stores/builder-store'

export function PreviewDialog() {
  const blockLayouts = useBuilderStore(store => store.blockLayouts)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="text-primary border-primary hover:bg-primary hover:text-white"
        >
          <EyeIcon />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col flex-grow p-0 gap-0 max-w-screen h-screen">
        <DialogHeader className="p-4 shadow-sm bg-white">
          <DialogTitle>Preview Mode</DialogTitle>
        </DialogHeader>
        <div
          className="w-full h-full overflow-y-auto scrollbar transition-all duration-300"
          style={{ background: defaultBackgroundColor }}
        >
          <div className="w-full h-full max-w-[650px] mx-auto">
            <div className="w-full relative bg-transparent px-2 flex flex-col items-center justify-start py-1 pb-14">
              <div className="w-full mb-3 bg-cover bg-no-repeat bg-white bg-[url(/images/form-bg.jpg)] bg-center border shadow-sm h-[135px] max-w-[768px] rounded-sm px-1" />

              {blockLayouts.length > 0 && (
                <div className="flex flex-col w-full gap-2">
                  {blockLayouts.map(block => {
                    const FormBlockComponent =
                      FormBlocks[block.blockType].formComponent
                    return (
                      <FormBlockComponent
                        key={block.id}
                        blockInstance={block}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
