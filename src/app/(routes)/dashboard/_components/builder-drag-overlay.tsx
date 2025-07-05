'use client'

import { type Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { useState } from 'react'

import type { BlockType } from '@/@types'
import { BlockButtonDragOverlay } from '@/components/block-button-drag-overlay'
import { FormBlocks } from '@/lib/form-blocks'
import { useBuilderStore } from '@/stores/builder-store'

export function BuilderDragOverlay() {
  const blockLayouts = useBuilderStore(store => store.blockLayouts)
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

  useDndMonitor({
    onDragStart: event => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null

  let fallbackNode = <div>No block drag</div>
  const isBlockBtnElement = draggedItem.data?.current?.isBlockBtnElement
  const isCanvasLayout = draggedItem.data?.current?.isCanvasLayout

  if (isBlockBtnElement) {
    const blockType = draggedItem.data?.current?.blockType as BlockType
    fallbackNode = <BlockButtonDragOverlay formBlock={FormBlocks[blockType]} />
  }

  if (isCanvasLayout) {
    const blockId = draggedItem.data?.current?.blockId as string
    const blockLayout = blockLayouts.find(block => block.id === blockId)

    if (!blockLayout) fallbackNode = <div>No block drag</div>
    else {
      const CanvasBlockComponent =
        FormBlocks[blockLayout.blockType].canvasComponent
      fallbackNode = (
        <div className="pointer-events-none">
          <CanvasBlockComponent blockInstance={blockLayout} />
        </div>
      )
    }
  }

  return (
    <DragOverlay>
      <div className="optional-95 cursor-grabbing">{fallbackNode}</div>
    </DragOverlay>
  )
}
