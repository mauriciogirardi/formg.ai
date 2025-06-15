import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

type Item = { value: string; label: string }

type FormInputProps<
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>,
> = {
  form: UseFormReturn<TFormValues>
  name: TFieldName
  label: string
  description?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  placeholder: string
  items: Item[]
}

export function FormSelect<
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>,
>({
  form,
  name,
  label,
  description,
  onValueChange,
  defaultValue,
  placeholder,
  items,
}: FormInputProps<TFormValues, TFieldName>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal">{label}</FormLabel>
          <FormControl>
            <Select
              {...field}
              defaultValue={defaultValue}
              onValueChange={value => {
                field.onChange(value)
                onValueChange?.(value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {items.map(item => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
