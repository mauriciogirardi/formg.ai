import type { FormBlockType } from '@/@types'
import { TextSelect } from 'lucide-react'
import { SelectCanvasComponent } from './select-canvas-component'
import { SelectFormComponent } from './select-form-component'
import { SelectPropertiesComponent } from './select-properties-component'
import { blockCategory, blockType } from './types'

export const SelectBlock: FormBlockType = {
  blockType,
  blockCategory,
  onCreateInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: 'Select',
      helperText: '',
      required: false,
      placeHolder: 'Select value',
      options: ['Option 1'],
    },
  }),
  blockBtnElement: {
    icon: TextSelect,
    label: 'Select',
  },
  canvasComponent: SelectCanvasComponent,
  formComponent: SelectFormComponent,
  propertiesComponent: SelectPropertiesComponent,
}
