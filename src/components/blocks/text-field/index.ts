import type { FormBlockType } from '@/@types'
import { TextCursorInputIcon } from 'lucide-react'
import { TextFieldCanvasComponent } from './text-field-canvas-component'
import { TextFieldFormComponent } from './text-field-form-component'
import { TextFieldPropertiesComponent } from './text-field-properties-component'
import { blockCategory, blockType } from './types'

export const TextFieldBlock: FormBlockType = {
  blockType,
  blockCategory,
  onCreateInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: 'Text field',
      helperText: '',
      required: false,
      placeHolder: 'Enter text',
    },
  }),
  blockBtnElement: {
    icon: TextCursorInputIcon,
    label: 'Text field',
  },
  canvasComponent: TextFieldCanvasComponent,
  formComponent: TextFieldFormComponent,
  propertiesComponent: TextFieldPropertiesComponent,
}
