import type { HTMLInputTypeAttribute } from 'react'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

type FormInputProps<
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>,
> = {
  form: UseFormReturn<TFormValues>
  name: TFieldName
  label: string
  description?: string
  onValueChange?: (value: TFormValues[TFieldName]) => void
  defaultValue?: string | number
  type?: HTMLInputTypeAttribute
  max?: number
  min?: number
}

export function FormInput<
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>,
>({
  form,
  name,
  label,
  description,
  onValueChange,
  defaultValue,
  type,
  max,
  min,
}: FormInputProps<TFormValues, TFieldName>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              defaultValue={defaultValue}
              type={type}
              max={max}
              min={min}
              onChange={e => {
                field.onChange(e)
                if (onValueChange) {
                  onValueChange(e.target.value as TFormValues[TFieldName])
                }
              }}
            />
          </FormControl>
          {description && (
            <FormDescription className="text-[11px] mt-2 pl-1">
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
