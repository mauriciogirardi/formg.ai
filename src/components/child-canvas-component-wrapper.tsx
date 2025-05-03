import type { FormBlockInstance } from '@/@types'
import { FormBlocks } from '@/lib/form-blocks'

type ChildCanvasComponentWrapper = {
  block: FormBlockInstance
}

export function ChildCanvasComponentWrapper({
  block,
}: ChildCanvasComponentWrapper) {
  const CanvasComponent = FormBlocks[block.blockType].canvasComponent

  if (!CanvasComponent) return null

  return <CanvasComponent blockInstance={block} />
}
