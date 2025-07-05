import {
  CopyIcon,
  GripHorizontal,
  Rows2,
  Trash2Icon,
  XIcon,
} from 'lucide-react'
import { type MouseEvent, useState } from 'react'

import type {
  BlockType,
  FormBlockInstance,
  FormBlockType,
  FormCategoriesType,
  FormErrorsType,
  HandleBlurFunc,
} from '@/@types'

import { ChildCanvasComponentWrapper } from '@/components/child-canvas-component-wrapper'
import { ChildFormComponentWrapper } from '@/components/child-form-component-wrapper'
import { ChildPropertiesComponentWrapper } from '@/components/child-properties-component-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { allBlockLayouts } from '@/constants'
import { FormBlocks } from '@/lib/form-blocks'
import { generateUniqueId } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { useBuilderStore } from '@/stores/builder-store'
import {
  type Active,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core'

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
  const onDuplicateBlockLayout = useBuilderStore(
    store => store.onDuplicateBlockLayout
  )
  const onUpdateBlockLayout = useBuilderStore(
    store => store.onUpdateBlockLayout
  )
  const onRemoveBlockLayout = useBuilderStore(
    store => store.onRemoveBlockLayout
  )
  const onSelectedLayout = useBuilderStore(store => store.onSelectedLayout)
  const selectedBlockLayout = useBuilderStore(
    store => store.selectedBlockLayout
  )

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
        <CardContent className="px-2">
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
                    className="flex justify-center gap-1 w-full relative"
                  >
                    <ChildCanvasComponentWrapper block={block} />
                    {isSelected && !blockInstance.isLocked && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="bg-transparent w-6 h-6 absolute right-0 -top-1.5"
                        onClick={e => {
                          e.stopPropagation()
                          handleRemoveChildBlock(block.id)
                          if (childBlocks.length === 1) handleDelete(e)
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

        {isSelected && (
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

type RowLayoutFormComponentProps = {
  blockInstance: FormBlockInstance
  onBlur?: HandleBlurFunc
  formErrors?: FormErrorsType
}

function RowLayoutFormComponent({
  blockInstance,
  formErrors,
  onBlur,
}: RowLayoutFormComponentProps) {
  const childBlocks = blockInstance.childBlocks || []

  return (
    <div className="max-w-full">
      {blockInstance.isLocked && <Border />}
      <Card
        className={cn(
          'w-full bg-white relative border shadow-sm min-h-[120px] max-w-[768px] rounded-md p-0',
          blockInstance.isLocked && 'rounded-t-none'
        )}
      >
        <CardContent className="px-2 pb-2">
          <div className="flex flex-wrap gap-2">
            <div className="flex w-full flex-col items-center justify-center gap-4 py-4 px-3">
              {childBlocks.map(child => (
                <div
                  key={child.id}
                  className="flex items-center justify-center gap-1 h-auto w-full"
                >
                  <ChildFormComponentWrapper
                    blockInstance={child}
                    onBlur={onBlur}
                    isError={!!formErrors?.[child.id]}
                    errorMessage={formErrors?.[child.id]}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

type RowLayoutPropertiesComponentProps = {
  blockInstance: FormBlockInstance
}

function RowLayoutPropertiesComponent({
  blockInstance,
}: RowLayoutPropertiesComponentProps) {
  const childBlocks = blockInstance.childBlocks || []

  return (
    <div className="pt-4 w-full">
      <div className="flex w-full flex-col justify-start ">
        {childBlocks.map((block, index) => (
          <div
            key={block.id}
            className="flex items-center justify-center gap-1 h-auto"
          >
            <ChildPropertiesComponentWrapper
              index={index + 1}
              parentId={blockInstance.id}
              blockInstance={block}
            />
          </div>
        ))}
      </div>
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
