import type { FormBlockInstance } from '@/@types'
import { FormHelperText } from '@/components/form-helper-text'
import { FormLabel } from '@/components/form-label'
import { Input } from '@/components/ui/input'
import type { NewInstance } from './types'

export function TextFieldCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance
}) {
  const block = blockInstance as NewInstance
  const { helperText, label, placeHolder, required } = block.attributes
  return (
    <div className="flex flex-col gap-1 w-full">
      <FormLabel label={label} required={required} />
      <Input
        readOnly
        className="!pointer-events-none cursor-default h-10"
        placeholder={placeHolder}
      />
      <FormHelperText text={helperText} />
    </div>
  )
}
