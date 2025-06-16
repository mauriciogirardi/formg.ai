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
import { Textarea } from './ui/textarea'

type FormTextareaProps<
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>,
> = {
  form: UseFormReturn<TFormValues>
  name: TFieldName
  label: string
  description?: string
  onValueChange?: (value: string) => void
  placeholder?: string
}

export function FormTextarea<
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>,
>({
  form,
  name,
  label,
  description,
  onValueChange,
  placeholder,
}: FormTextareaProps<TFormValues, TFieldName>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal">{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              className="scrollbar"
              onChange={e => {
                field.onChange(e)
                onValueChange?.(e.target.value)
              }}
              rows={4}
              placeholder={placeholder}
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
