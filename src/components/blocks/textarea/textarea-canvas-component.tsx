import { FormHelperText } from '@/components/form-helper-text'
import { FormLabel } from '@/components/form-label'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  type NewInstance,
  type TextAreaCanvasComponentProps,
  defaultColumnValue,
  defaultRowValue,
} from './types'

export function TextareaCanvasComponent({
  blockInstance,
}: TextAreaCanvasComponentProps) {
  const block = blockInstance as NewInstance
  const { label, placeHolder, required, helperText, rows } = block.attributes

  return (
    <div className="flex flex-col gap-2 w-full">
      <FormLabel label={label} required={required} />
      <Textarea
        placeholder={placeHolder}
        rows={rows || defaultRowValue}
        cols={defaultColumnValue}
        readOnly
        className="resize-none !min-h-[50px] !pointer-events-none cursor-default"
      />
      <FormHelperText text={helperText} />
    </div>
  )
}
