import type {
  BlockType,
  FormBlockInstance,
  FormBlockType,
  FormCategoriesType,
} from '@/@types'
import { CircleIcon } from 'lucide-react'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const blockType: BlockType = 'RadioSelect'
const blockCategory: FormCategoriesType = 'Field'

type AttributesType = {
  label: string
  options: string[]
  required: boolean
}

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

type RadioSelectCanvasComponentProps = {
  blockInstance: FormBlockInstance
}

function RadioSelectCanvasComponent({
  blockInstance,
}: RadioSelectCanvasComponentProps) {
  const { label, options, required } =
    blockInstance.attributes as AttributesType

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label className="text-base font-normal mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}

        <RadioGroup
          disabled
          className="space-y-2 mt-3 disabled:cursor-default pointer-events-none cursor-default"
        >
          {options.map(option => (
            <div key={option} className="flex items-center gap-2">
              <RadioGroupItem disabled value={option} id={option} />
              <Label htmlFor={option} className="font-normal">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Label>
    </div>
  )
}

function RadioSelectFormComponent() {
  return (
    <div>
      <p>Radio Form</p>
    </div>
  )
}

function RadioSelectPropertiesComponent() {
  return (
    <div>
      <p>Radio Properties</p>
    </div>
  )
}
