'use client'

import { FormInput } from '@/components/form-input'
import { FormSwitch } from '@/components/form-switch'
import { PropertyName } from '@/components/property-name'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useBuilder } from '@/context/builder-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon, XIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  type AttributesType,
  type FormData,
  type RadioSelectPropertiesComponentProps,
  propertiesValidateSchema,
} from './types'

export function RadioSelectPropertiesComponent({
  blockInstance,
  positionIndex,
  parentId,
}: RadioSelectPropertiesComponentProps) {
  const { onUpdateChildBlock } = useBuilder()

  const { label, options, required } =
    blockInstance.attributes as AttributesType

  const form = useForm<FormData>({
    resolver: zodResolver(propertiesValidateSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      options,
      required,
    },
  })

  useEffect(() => {
    form.reset({
      label,
      options,
      required,
    })
  }, [form.reset, label, options, required])

  const handleChange = (values: FormData) => {
    if (!parentId) return null

    onUpdateChildBlock({
      parentId,
      childBlockId: blockInstance.id,
      updatedBlock: {
        ...blockInstance,
        attributes: {
          ...blockInstance.attributes,
          ...values,
        },
      },
    })
  }

  return (
    <div className="w-full pb-4">
      <PropertyName name={`Radio ${positionIndex}`} />

      <Form {...form}>
        <form
          onSubmit={e => {
            e.preventDefault()
          }}
          className="w-full space-y-3"
        >
          <FormInput
            form={form}
            name="label"
            label="Label"
            onValueChange={value => {
              handleChange({
                ...form.getValues(),
                label: value,
              })
            }}
          />

          <FormField
            control={form.control}
            name="options"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-normal">Options</FormLabel>
                <div className="flex flex-col gap-1">
                  {field.value.map((option, index) => (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      key={index}
                      className="relative flex items-center justify-between gap-2"
                    >
                      <Input
                        className="w-full"
                        value={option}
                        onChange={e => {
                          const updatedOptions = [...(field.value || [])]
                          updatedOptions[index] = e.target.value
                          field.onChange(updatedOptions)
                          handleChange({
                            ...form.getValues(),
                            options: updatedOptions,
                          })
                        }}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="p-0 absolute -right-1 -top-1 bg-rose-500 hover:bg-rose-400 rounded-full w-4 h-4"
                        onClick={() => {
                          const updatedOptions = field.value?.filter(
                            (_, i) => i !== index
                          )
                          field.onChange(updatedOptions)
                          handleChange({
                            ...form.getValues(),
                            options: updatedOptions,
                          })
                        }}
                      >
                        <XIcon className="size-2.5 text-white" />
                      </Button>
                    </div>
                  ))}

                  <FormMessage />

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    size="sm"
                    onClick={() => {
                      const currentOptions = field?.value || []
                      const newOption = `Option ${currentOptions.length + 1}`
                      const updatedOptions = [...currentOptions, newOption]
                      field.onChange(updatedOptions)
                      handleChange({
                        ...form.getValues(),
                        options: updatedOptions,
                      })
                    }}
                  >
                    <PlusIcon />
                    Add Option
                  </Button>
                </div>
              </FormItem>
            )}
          />

          <FormSwitch
            form={form}
            name="required"
            onValueChange={value => {
              handleChange({
                ...form.getValues(),
                required: value,
              })
            }}
          />
        </form>
      </Form>
    </div>
  )
}
