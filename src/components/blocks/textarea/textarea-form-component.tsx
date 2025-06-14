'use client'

import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import {
  defaultColumnValue,
  defaultRowValue,
  type NewInstance,
  type TextareaFormComponentProps,
} from './types'
import { FormLabel } from '@/components/form-label'
import { FormHelperText } from '@/components/form-helper-text'
import { cn } from '@/lib/utils'
import { FormError } from '@/components/form-error'

export function TextareaFormComponent({
  blockInstance,
  onBlur,
  isError: isSubmitError,
  errorMessage,
}: TextareaFormComponentProps) {
  const block = blockInstance as NewInstance
  const { label, placeHolder, required, helperText, rows } = block.attributes

  const [value, setValue] = useState('')
  const [isError, setIsError] = useState(false)
  const error = isError || isSubmitError

  const validateField = (val: string) => {
    if (required) return val.trim().length > 0
    return true
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <FormLabel label={label} error={error} required={required} />

      <Textarea
        placeholder={placeHolder}
        rows={rows || defaultRowValue}
        cols={defaultColumnValue}
        className={cn('resize-none !min-h-[50px]', error && '!border-rose-500')}
        value={value}
        onChange={event => setValue(event.target.value)}
        onBlur={event => {
          const inputValue = event.target.value
          const isValid = validateField(inputValue)
          setIsError(!isValid)
          onBlur?.(block.id, inputValue)
        }}
      />

      <FormHelperText text={helperText} />
      <FormError
        error={error}
        errorMessage={errorMessage}
        required={required && value.trim().length === 0}
      />
    </div>
  )
}
