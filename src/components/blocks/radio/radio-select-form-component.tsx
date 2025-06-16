import { FormError } from '@/components/form-error'
import { FormLabel } from '@/components/form-label'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { generateUniqueId } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { validateField } from '@/utils'
import { useState } from 'react'
import type { AttributesType, RadioSelectFormComponentProps } from './types'

export function RadioSelectFormComponent({
  blockInstance,
  onBlur,
  isError: isSubmitError,
  errorMessage,
}: RadioSelectFormComponentProps) {
  const block = blockInstance
  const { label, options, required } =
    blockInstance.attributes as AttributesType

  const [isError, setIsError] = useState(false)

  const error = isError || isSubmitError

  return (
    <div className="flex flex-col gap-3 w-full">
      <FormLabel label={label} error={error} required={required}>
        <div className="space-y-2">
          <RadioGroup
            className="space-y-2 mt-3"
            onValueChange={value => {
              const isValid = validateField(value, required)
              setIsError(!isValid)
              onBlur?.(block.id, value)
            }}
          >
            {options.map(option => {
              const uniqueId = `option-${generateUniqueId()}`
              return (
                <div key={option} className="flex items-center gap-2 w-max">
                  <RadioGroupItem
                    value={option}
                    id={uniqueId}
                    className={cn('cursor-pointer', error && 'text-rose-500')}
                  />
                  <Label
                    htmlFor={uniqueId}
                    className="font-normal cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              )
            })}
          </RadioGroup>

          <FormError
            error={error}
            errorMessage={errorMessage}
            required={required}
          />
        </div>
      </FormLabel>
    </div>
  )
}
