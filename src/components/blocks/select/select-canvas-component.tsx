import type { FormBlockInstance } from '@/@types'
import type { NewInstance } from './types'
import { FormLabel } from '@/components/form-label'
import { FormHelperText } from '@/components/form-helper-text'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SelectCanvasComponentProps = {
  blockInstance: FormBlockInstance
}

export function SelectCanvasComponent({
  blockInstance,
}: SelectCanvasComponentProps) {
  const block = blockInstance as NewInstance
  const { helperText, label, placeHolder, required, options } = block.attributes

  return (
    <div className="flex flex-col gap-1 w-full">
      <FormLabel label={label} required={required} />
      <Select>
        <SelectTrigger className="h-10">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map(value => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormHelperText text={helperText} />
    </div>
  )
}
