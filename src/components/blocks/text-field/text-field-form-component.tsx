import { FormError } from '@/components/form-error'
import { FormHelperText } from '@/components/form-helper-text'
import { FormLabel } from '@/components/form-label'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { validateField } from '@/utils'
import { useState } from 'react'
import type { NewInstance, TextFieldFormComponentProps } from './types'

export function TextFieldFormComponent({
  blockInstance,
  onBlur,
  isError: isSubmitError,
  errorMessage,
}: TextFieldFormComponentProps) {
  const block = blockInstance as NewInstance
  const { helperText, label, placeHolder, required } = block.attributes

  const [value, setValue] = useState('')
  const [isError, setIsError] = useState(false)

  const error = isError || isSubmitError

  return (
    <div className="flex flex-col gap-2 w-full">
      <FormLabel label={label} required={required} error={error} />

      <Input
        value={value}
        onChange={event => setValue(event.target.value)}
        onBlur={event => {
          const inputValue = event.target.value
          const isValid = validateField(inputValue, required)
          setIsError(!isValid)
          onBlur?.(block.id, inputValue)
        }}
        className={cn('h-10', error && 'border-rose-500')}
        placeholder={placeHolder}
      />

      <FormHelperText text={helperText} />
      <FormError
        error={error}
        required={required}
        errorMessage={errorMessage}
      />
    </div>
  )
}
