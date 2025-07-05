'use client'

import { type Active, useDndMonitor, useDroppable } from '@dnd-kit/core'
import { useState } from 'react'

import type { BlockType, FormBlockInstance, PositionLayout } from '@/@types'

import { allBlockLayouts } from '@/constants'
import { FormBlocks } from '@/lib/form-blocks'
import { generateUniqueId } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { FloatingShareButton } from './floating-share-button'
import { useBuilderStore } from '@/stores/builder-store'

export function BuilderCanvas() {
  const blockLayouts = useBuilderStore(store => store.blockLayouts)
  const onAddBlockLayout = useBuilderStore(store => store.onAddBlockLayout)
  const onRepositionBlockLayout = useBuilderStore(
    store => store.onRepositionBlockLayout
  )
  const onInsertBlockLayoutAtIndex = useBuilderStore(
    store => store.onInsertBlockLayoutAtIndex
  )

  const [activeBlock, setActiveBlock] = useState<Active | null>(null)

  const droppable = useDroppable({
    id: 'builder-canvas-droppable',
    data: {
      isBuilderCanvasDropArea: true,
    },
  })

  useDndMonitor({
    onDragStart: event => {
      setActiveBlock(event.active)
    },
    onDragEnd: event => {
      console.log('DRAG END', event)
      const { active, over } = event
      if (!over || !active) return
      setActiveBlock(null)

      const isBlockBtnElement = active?.data?.current?.isBlockBtnElement
      const isBlockLayout = active?.data?.current?.blockType

      const isDraggingOverCanvas = over.data?.current?.isBuilderCanvasDropArea

      if (
        isBlockBtnElement &&
        allBlockLayouts.includes(isBlockLayout) &&
        isDraggingOverCanvas
      ) {
        const blockType = active.data?.current?.blockType

        const newBlockLayout = FormBlocks[
          blockType as BlockType
        ].onCreateInstance(generateUniqueId())
        console.log('NEW BLOCK Layout Instance', newBlockLayout)
        onAddBlockLayout(newBlockLayout)
        return
      }

      const isDroppingOverCanvasBlockLayoutAbove = over?.data?.current?.isAbove
      const isDroppingOverCanvasBlockLayoutBelow = over?.data?.current?.isBelow

      const isDroppingOverCanvasLayout =
        isDroppingOverCanvasBlockLayoutAbove ||
        isDroppingOverCanvasBlockLayoutBelow

      //-> NEW BLOCK LAYOUT TO A SPECIFIC POSITION
      const droppingLayoutBlockOverCanvas =
        isBlockBtnElement &&
        allBlockLayouts.includes(isBlockLayout) &&
        isDroppingOverCanvasLayout

      if (droppingLayoutBlockOverCanvas) {
        const blockType = active.data?.current?.blockType
        const overId = over?.data?.current?.blockId

        const newBlockLayout = FormBlocks[
          blockType as BlockType
        ].onCreateInstance(generateUniqueId())

        let position: PositionLayout = 'below'
        if (isDroppingOverCanvasBlockLayoutAbove) {
          position = 'above'
        }

        onInsertBlockLayoutAtIndex({ overId, newBlockLayout, position })
        return
      }

      //-> EXISTING BLOCK LAYOUT TO A SPECIFIC POSITION
      const isDraggingCanvasLayout = active.data?.current?.isCanvasLayout

      const draggingCanvasLayoutOverAnotherLayout =
        isDroppingOverCanvasLayout && isDraggingCanvasLayout

      if (draggingCanvasLayoutOverAnotherLayout) {
        const activeId = active?.data?.current?.blockId
        const overId = over?.data?.current?.blockId

        let position: PositionLayout = 'below'
        if (isDroppingOverCanvasBlockLayoutAbove) {
          position = 'above'
        }

        onRepositionBlockLayout({ activeId, overId, position })
        return
      }
    },
  })

  return (
    <div className="relative px-5 md:px-0 w-full h-[calc(100vh_-_65px)] pt-4 pb-[120px] overflow-auto transition-all duration-300 scrollbar">
      <div className="w-full h-full max-w-[650px] mx-auto">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'w-full relative bg-transparent px-2 rounded-md flex flex-col min-h-[calc(100vh_-_205px)] items-center justify-start pt-2 pb-14',
            droppable.isOver &&
              blockLayouts.length === 0 &&
              'ring-2 ring-primary/20 ring-inset'
          )}
        >
          <div className="w-full mb-3 bg-cover bg-no-repeat bg-white bg-[url(/images/form-bg.jpg)] bg-center border shadow-sm h-[135px] max-w-[768px] rounded-sm px-1" />

          {blockLayouts.length > 0 && (
            <div className="flex flex-col w-full gap-4">
              {blockLayouts.map(block => (
                <CanvasBlockLayoutWrapper
                  key={block.id}
                  activeBlock={activeBlock}
                  blockLayout={block}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type CanvasBlockLayoutWrapperProps = {
  blockLayout: FormBlockInstance
  activeBlock: Active | null
}

function CanvasBlockLayoutWrapper({
  blockLayout,
  activeBlock,
}: CanvasBlockLayoutWrapperProps) {
  const CanvasBlockLayout = FormBlocks[blockLayout.blockType].canvasComponent

  const topCorner = useDroppable({
    id: `${blockLayout.id}_above`,
    data: {
      blockType: blockLayout.blockType,
      blockId: blockLayout.id,
      isAbove: true,
    },
  })

  const bottomCorner = useDroppable({
    id: `${blockLayout.id}_below`,
    data: {
      blockType: blockLayout.blockType,
      blockId: blockLayout.id,
      isBelow: true,
    },
  })

  const showTopCorner =
    !blockLayout.isLocked &&
    allBlockLayouts.includes(activeBlock?.data?.current?.blockType)

  const showBottomCorner =
    !blockLayout.isLocked &&
    allBlockLayouts.includes(activeBlock?.data?.current?.blockType)

  return (
    <div className="relative mb-1">
      {showTopCorner && (
        <div
          ref={topCorner.setNodeRef}
          className="absolute top-0 w-full h-1/2 rounded-t-md pointer-events-none"
        >
          {topCorner.isOver && (
            <div className="absolute w-full -top-[3px] h-1.5 bg-primary rounded-t-md" />
          )}
        </div>
      )}

      {showBottomCorner && (
        <div
          ref={bottomCorner.setNodeRef}
          className="absolute bottom-0 w-full h-1/2 rounded-b-md pointer-events-none"
        >
          {bottomCorner.isOver && (
            <div className="absolute w-full -bottom-[3px] h-1.5 bg-primary rounded-b-md" />
          )}
        </div>
      )}

      <CanvasBlockLayout blockInstance={blockLayout} />
      <FloatingShareButton />
    </div>
  )
}
