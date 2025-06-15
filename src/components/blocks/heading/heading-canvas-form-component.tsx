import type { FormBlockInstance } from '@/@types'
import { fontSizeClass, fontWeightClass } from '@/constants'
import { cn } from '@/lib/utils'
import React from 'react'
import type { NewInstance } from './types'

export function HeadingCanvasFormComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance
}) {
  const block = blockInstance as NewInstance
  const { level, label, fontSize, fontWeight } = block.attributes
  return (
    <div
      className={cn(
        `w-full text-left ${fontSizeClass[fontSize]} ${fontWeightClass[fontWeight]}`
      )}
    >
      {React.createElement(
        `h${level}`, // Dynamically create heading tag based on 'level'
        {}, // No additional props for the heading element
        label // Label for the heading
      )}
    </div>
  )
}
