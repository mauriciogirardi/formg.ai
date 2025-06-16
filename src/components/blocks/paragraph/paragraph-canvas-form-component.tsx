import type { FormBlockInstance } from '@/@types'
import { fontSizeClass, fontWeightClass } from '@/constants'
import { cn } from '@/lib/utils'
import type { NewInstance } from './types'

export function ParagraphCanvasFormComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance
}) {
  const block = blockInstance as NewInstance
  const { text, fontSize, fontWeight } = block.attributes

  return (
    <div
      className={cn(
        'w-full text-left',
        fontSizeClass[fontSize],
        fontWeightClass[fontWeight]
      )}
    >
      <p>{text}</p>
    </div>
  )
}
