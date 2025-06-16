import type { FormBlockType } from '@/@types'
import { TextIcon } from 'lucide-react'
import { ParagraphCanvasFormComponent } from './paragraph-canvas-form-component'
import { ParagraphPropertiesComponent } from './paragraph-properties-component'
import { blockCategory, blockType } from './types'

export const ParagraphBlock: FormBlockType = {
  blockType,
  blockCategory,
  onCreateInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: 'Paragraph',
      text: 'Lorem ipsum dolor sit amet,consectetur adipiscing elit. Curabitur quis sem odio. Sed commodo vestibulum leo.',
      fontSize: 'small',
      fontWeight: 'normal',
    },
  }),

  blockBtnElement: {
    icon: TextIcon,
    label: 'Paragraph',
  },
  canvasComponent: ParagraphCanvasFormComponent,
  formComponent: ParagraphCanvasFormComponent,
  propertiesComponent: ParagraphPropertiesComponent,
}
