import type { FormBlockType } from '@/@types'
import { CircleIcon } from 'lucide-react'
import { RadioSelectCanvasComponent } from './radio-select-canvas-component'
import { RadioSelectFormComponent } from './radio-select-form-component'
import { RadioSelectPropertiesComponent } from './radio-select-properties-component'
import { blockCategory, blockType } from './types'

export const RadioSelectBlock: FormBlockType = {
  blockCategory,
  blockType,
  blockBtnElement: {
    icon: CircleIcon,
    label: 'Radio',
  },
  onCreateInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: 'Select an option',
      options: ['Option 1', 'Option 2'],
      required: false,
    },
  }),
  canvasComponent: RadioSelectCanvasComponent,
  formComponent: RadioSelectFormComponent,
  propertiesComponent: RadioSelectPropertiesComponent,
}
