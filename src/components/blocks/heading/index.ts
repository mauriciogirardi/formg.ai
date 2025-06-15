import type { FormBlockType } from '@/@types'
import { HeadingIcon } from 'lucide-react'
import { HeadingCanvasFormComponent } from './heading-canvas-form-component'
import { HeadingPropertiesComponent } from './heading-properties-component'
import { blockCategory, blockType } from './types'

export const HeadingBlock: FormBlockType = {
  blockType,
  blockCategory,
  onCreateInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: 'Heading',
      level: 1, // Default to H1
      fontSize: 'medium',
      fontWeight: 'normal',
    },
  }),
  blockBtnElement: {
    icon: HeadingIcon,
    label: 'Heading',
  },
  canvasComponent: HeadingCanvasFormComponent,
  formComponent: HeadingCanvasFormComponent,
  propertiesComponent: HeadingPropertiesComponent,
}
