import { useEffect } from 'react'
import { ChevronDown, CircleIcon, Plus, X } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type {
  BlockType,
  FormBlockInstance,
  FormBlockType,
  FormCategoriesType,
} from '@/@types'
import { useBuilder } from '@/context/builder-provider'

import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'

const blockType: BlockType = 'RadioSelect'
const blockCategory: FormCategoriesType = 'Field'

type AttributesType = {
  label: string
  options: string[]
  required: boolean
}

export const RadioSelectBlock: FormBlockType = {
  blockCategory,
  blockType,
  blockBtnElement: {
    icon: CircleIcon,
    label: 'Radio',
  },
  onCreateInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: 'Select an option',
      options: ['Option 1', 'Option 2'],
      required: false,
    },
  }),
  canvasComponent: RadioSelectCanvasComponent,
  formComponent: RadioSelectFormComponent,
  propertiesComponent: RadioSelectPropertiesComponent,
}

type RadioSelectCanvasComponentProps = {
  blockInstance: FormBlockInstance
}

function RadioSelectCanvasComponent({
  blockInstance,
}: RadioSelectCanvasComponentProps) {
  const { label, options, required } =
    blockInstance.attributes as AttributesType

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label className="text-base font-normal mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}

        <RadioGroup
          disabled
          className="space-y-2 mt-3 disabled:cursor-default pointer-events-none cursor-default"
        >
          {options.map(option => (
            <div key={option} className="flex items-center gap-2">
              <RadioGroupItem disabled value={option} id={option} />
              <Label htmlFor={option} className="font-normal">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Label>
    </div>
  )
}

type RadioSelectPropertiesComponentProps = {
  positionIndex?: number
  parentId?: string
  blockInstance: FormBlockInstance
}

const propertiesValidateSchema = z.object({
  label: z.string().trim().min(2).max(225),
  required: z.boolean().default(false),
  options: z.array(z.string().min(1)),
})

type FormData = z.infer<typeof propertiesValidateSchema>

function RadioSelectPropertiesComponent({
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
      <div className="flex w-full items-center justify-between gap-1 bg-gray-100 h-auto p-1 px-2 mb-2.5 rounded-sm">
        <span className="text-sm font-medium text-gray-600 tracking-wide">
          Radio {positionIndex}
        </span>
        <ChevronDown className="size-4" />
      </div>

      <Form {...form}>
        <form
          onSubmit={e => {
            e.preventDefault()
          }}
          className="w-full space-y-3"
        >
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-normal">Label</FormLabel>

                <Input
                  className="w-full"
                  {...field}
                  onChange={e => {
                    field.onChange(e)
                    handleChange({
                      ...form.getValues(),
                      label: e.target.value,
                    })
                  }}
                />
              </FormItem>
            )}
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
                        <X className="size-2.5 text-white" />
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
                    <Plus />
                    Add Option
                  </Button>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="flex items-baseline justify-between w-full gap-2">
                  <FormLabel className="text-sm font-normal">
                    Required
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={value => {
                        field.onChange(value)
                        handleChange({
                          ...form.getValues(),
                          required: value,
                        })
                      }}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

function RadioSelectFormComponent() {
  return (
    <div>
      <p>Radio Form</p>
    </div>
  )
}
