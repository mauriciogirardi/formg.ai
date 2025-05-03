import {
  CopyIcon,
  GripHorizontal,
  Rows2,
  Trash2Icon,
  XIcon,
} from 'lucide-react'
import { useState, type MouseEvent } from 'react'

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
import {
  type Active,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'
import { allBlockLayouts } from '@/constants'
import { ChildCanvasComponentWrapper } from '@/components/child-canvas-component-wrapper'
import { FormBlocks } from '@/lib/form-blocks'
import { generateUniqueId } from '@/lib/helpers'

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
    onUpdateBlockLayout,
    onSelectedLayout,
    selectedBlockLayout,
  } = useBuilder()

  const [activeBlock, setActiveBlock] = useState<Active | null>(null)

  const childBlocks = blockInstance.childBlocks || []
  const isSelected = selectedBlockLayout?.id === blockInstance.id

  const droppable = useDroppable({
    id: blockInstance.id,
    disabled: blockInstance.isLocked,
    data: {
      isLayoutDropArea: true,
    },
  })

  const draggable = useDraggable({
    id: `${blockInstance.id}_drag-area`,
    disabled: blockInstance.isLocked,
    data: {
      blockType: blockInstance.blockType,
      blockId: blockInstance.id,
      isCanvasLayout: true,
    },
  })

  useDndMonitor({
    onDragStart: event => {
      setActiveBlock(event.active)
    },
    onDragEnd: event => {
      const { active, over } = event
      if (!over || !active) return
      setActiveBlock(null)

      const isBlockBtnElement = active.data?.current?.isBlockBtnElement
      const isLayout = active.data?.current?.blockType
      const overBlockId = over.id

      if (
        isBlockBtnElement &&
        !allBlockLayouts.includes(isLayout) &&
        overBlockId === blockInstance.id
      ) {
        const blockType = active.data?.current?.blockType as BlockType
        const newBlock = FormBlocks[blockType].onCreateInstance(
          generateUniqueId()
        )
        const updatedChildrenBlock = [...childBlocks, newBlock]

        onUpdateBlockLayout({
          id: blockInstance.id,
          childrenBlocks: updatedChildrenBlock,
        })
      }
    },
  })

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

  const handleRemoveChildBlock = (id: string) => {
    const filteredBlock = childBlocks.filter(child => child.id !== id)
    onUpdateBlockLayout({ id: blockInstance.id, childrenBlocks: filteredBlock })
  }

  if (draggable.isDragging) return

  return (
    <div ref={draggable.setNodeRef} className="max-w-full">
      {blockInstance.isLocked && <Border />}

      <Card
        ref={droppable.setNodeRef}
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
            {droppable.isOver &&
              !blockInstance.isLocked &&
              activeBlock?.data?.current?.isBlockBtnElement &&
              !allBlockLayouts.includes(activeBlock.data.current.blockType) && (
                <div className="relative border border-dotted border-primary bg-primary/10 w-full h-28">
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 text-xs bg-primary text-white text-center w-28 p-1 rounded-b-full shadow-md">
                    Drag it here
                  </div>
                </div>
              )}

            {!droppable.isOver && childBlocks.length === 0 ? (
              <Placeholder />
            ) : (
              <div className="flex items-center justify-start gap-4 py-4 px-3 w-full flex-col">
                {childBlocks?.map(block => (
                  <div
                    key={block.id}
                    className="flex justify-center gap-1 w-full"
                  >
                    <ChildCanvasComponentWrapper block={block} />
                    {isSelected && !blockInstance.isLocked && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-transparent w-6 h-6"
                        onClick={e => {
                          e.stopPropagation()
                          handleRemoveChildBlock(block.id)
                        }}
                      >
                        <XIcon />
                      </Button>
                    )}
                  </div>
                ))}
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
