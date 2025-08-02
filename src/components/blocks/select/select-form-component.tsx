import type { AttributesType, SelectFormComponentProps } from './types'
import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormError } from '@/components/form-error'
import { FormHelperText } from '@/components/form-helper-text'
import { cn } from '@/lib/utils'
import { validateField } from '@/utils'
import { FormLabel } from '@/components/form-label'

export function SelectFormComponent({
  blockInstance,
  onBlur,
  isError: isSubmitError,
  errorMessage,
}: SelectFormComponentProps) {
  const block = blockInstance
  const { label, options, required, helperText, placeHolder } =
    blockInstance.attributes as AttributesType

  const [isError, setIsError] = useState(false)
  const [value, setValue] = useState('')

  const error = isError || isSubmitError

  return (
    <div className="flex flex-col gap-2 w-full">
      <FormLabel label={label} required={required} error={error} />

      <Select
        value={value}
        onValueChange={value => {
          setValue(value)
          const isValid = validateField(value, required)
          setIsError(!isValid)
          onBlur?.(block.id, value)
        }}
      >
        <SelectTrigger className={cn('h-10', error && 'border-rose-500')}>
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
      <FormError
        error={error}
        required={required}
        errorMessage={errorMessage}
      />
    </div>
  )
}
