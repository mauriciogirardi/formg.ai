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
import type { HTMLInputTypeAttribute } from 'react'

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
