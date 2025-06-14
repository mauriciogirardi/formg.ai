import type { FormBlockType } from '@/@types'
import { blockType, blockCategory } from './types'
import { LetterTextIcon } from 'lucide-react'
import { TextareaCanvasComponent } from './textarea-canvas-component'
import { TextareaFormComponent } from './textarea-form-component'
import { TextareaPropertiesComponent } from './textarea-properties-component'

export const TextAreaBlock: FormBlockType = {
  blockType,
  blockCategory,
  onCreateInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: 'Textarea',
      helperText: '',
      required: false,
      placeHolder: 'Enter text here.',
      rows: 3,
    },
  }),
  blockBtnElement: {
    icon: LetterTextIcon,
    label: 'Textarea',
  },
  canvasComponent: TextareaCanvasComponent,
  formComponent: TextareaFormComponent,
  propertiesComponent: TextareaPropertiesComponent,
}
