import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Switch } from './ui/switch'

type FormSwitchProps<
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>,
> = {
  form: UseFormReturn<TFormValues>
  name: TFieldName
  onValueChange?: (value: boolean) => void
}

export function FormSwitch<
  TFormValues extends FieldValues,
  TFieldName extends Path<TFormValues>,
>({ form, name, onValueChange }: FormSwitchProps<TFormValues, TFieldName>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="text-end">
          <div className="flex items-center justify-between w-full gap-2">
            <FormLabel className="text-sm font-normal">Required</FormLabel>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={value => {
                  field.onChange(value)
                  if (onValueChange) {
                    onValueChange(value)
                  }
                }}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
