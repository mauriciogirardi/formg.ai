import type { FormBlockType } from '@/@types'
import { Button } from './ui/button'

type BlockButtonDragOverlayProps = {
  formBlock: FormBlockType
}

export function BlockButtonDragOverlay({
  formBlock,
}: BlockButtonDragOverlayProps) {
  const { icon: Icon, label } = formBlock.blockBtnElement

  return (
    <Button className="flex flex-col gap-2 h-[75px] w-20 cursor-grab !bg-white border text-gray-600 ring-2 ring-primary/80">
      <Icon className="!size-8 !stroke-[0.9] !cursor-grab" />
      <h5 className="text-[11.4px] -mt-1 text-gray-600 font-medium">{label}</h5>
    </Button>
  )
}
