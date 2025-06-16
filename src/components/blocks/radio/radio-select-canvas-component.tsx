import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { AttributesType, RadioSelectCanvasComponentProps } from './types'

export function RadioSelectCanvasComponent({
  blockInstance,
}: RadioSelectCanvasComponentProps) {
  const { label, options, required } =
    blockInstance.attributes as AttributesType

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label className="text-base font-normal">
        {label}
        {required && <span className="text-rose-500">*</span>}

        <RadioGroup
          disabled
          className="space-y-2 mt-2 disabled:cursor-default pointer-events-none cursor-default"
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
