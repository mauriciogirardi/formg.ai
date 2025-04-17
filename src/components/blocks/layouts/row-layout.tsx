import { CopyIcon, GripHorizontal, Rows2, Trash2Icon } from 'lucide-react'
import type { MouseEvent } from 'react'

import type {
  BlockType,
  FormBlockInstance,
  FormBlockType,
  FormCategoriesType,
} from '@/@types'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useBuilder } from '@/context/builder-provider'
import { useDraggable } from '@dnd-kit/core'

const blockType: BlockType = 'RowLayout'
const blockCategory: FormCategoriesType = 'Layout'

export const RowLayoutBlock: FormBlockType = {
  blockType,
  blockCategory,
  blockBtnElement: {
    icon: Rows2,
    label: 'Row Layout',
  },
  onCreateInstance: id => ({
    id: `layout-${id}`,
    blockType,
    isLocked: false,
    attributes: {},
    childBlocks: [],
  }),
  canvasComponent: RowLayoutCanvasComponent,
  formComponent: RowLayoutFormComponent,
  propertiesComponent: RowLayoutPropertiesComponent,
}

type RowLayoutCanvasComponentProps = {
  blockInstance: FormBlockInstance
}

function RowLayoutCanvasComponent({
  blockInstance,
}: RowLayoutCanvasComponentProps) {
  const {
    onDuplicateBlockLayout,
    onRemoveBlockLayout,
    onSelectedLayout,
    selectedBlockLayout,
  } = useBuilder()

  const childBlock = blockInstance.childBlocks || []
  const isSelected = selectedBlockLayout?.id === blockInstance.id

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onRemoveBlockLayout(blockInstance.id)
  }

  const handleDuplicated = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDuplicateBlockLayout(blockInstance.id)
  }

  const handleSelectedBlock = () => {
    onSelectedLayout(blockInstance)
  }

  const draggable = useDraggable({
    id: `${blockInstance.id}_drag-area`,
    disabled: blockInstance.isLocked,
    data: {
      blockType: blockInstance.blockType,
      blockId: blockInstance.id,
      isCanvasLayout: true,
    },
  })

  if (draggable.isDragging) return

  return (
    <div ref={draggable.setNodeRef} className="max-w-full">
      {blockInstance.isLocked && <Border />}

      <Card
        className={cn(
          'w-full bg-white border relative shadow-sm min-h-[120px] max-w-[768px] rounded-md !p-0',
          blockInstance.isLocked && '!rounded-t-none'
        )}
        onClick={handleSelectedBlock}
      >
        <CardContent className="px-2 pb-2">
          {!blockInstance.isLocked && (
            <Button
              {...draggable.listeners}
              {...draggable.attributes}
              className="flex bg-transparent items-center focus:outline-none hover:bg-transparent w-full h-[2px] cursor-move justify-center"
            >
              <GripHorizontal className="text-gray-600 size-5" />
            </Button>
          )}

          <div className="flex flex-wrap gap-2">
            {childBlock.length === 0 ? (
              <Placeholder />
            ) : (
              <div className="flex items-center justify-start gap-4 py-4 px-3 w-full flex-col">
                <div className="flex items-center justify-center gap-1">
                  <p>Child block</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        {isSelected && !blockInstance.isLocked && (
          <div className="w-[5px] absolute left-0 top-0 rounded-l-md h-full bg-primary" />
        )}

        {isSelected && !blockInstance.isLocked && (
          <CardFooter className="flex items-center gap-3 h-0 justify-end border-t p-3 transition-all">
            <Button
              variant="outline"
              size="icon"
              aria-label="Duplicate row layout"
              title="Duplicate row layout"
              onClick={handleDuplicated}
            >
              <CopyIcon />
            </Button>

            <Button
              variant="outline"
              size="icon"
              aria-label="Delete row layout"
              title="Delete row layout"
              onClick={handleDelete}
            >
              <Trash2Icon />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

function RowLayoutFormComponent() {
  return (
    <div>
      <p>Form Comp</p>
    </div>
  )
}

function RowLayoutPropertiesComponent() {
  return (
    <div>
      <p>Properties Comp</p>
    </div>
  )
}

function Border() {
  return <div className="w-full rounded-t-md min-h-[8px] bg-primary" />
}

function Placeholder() {
  return (
    <div className="flex flex-col items-center justify-center border border-dotted border-primary bg-primary/10 hover:bg-primary/5 w-full h-28 text-primary font-medium text-base gap-1">
      <p className="text-center text-primary/80">
        Drag and drop a block here to get started
      </p>
    </div>
  )
}
