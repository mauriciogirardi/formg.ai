import { useEffect, useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import type {
  FormBlockInstance,
  FormBlockType,
  FormCategoriesType,
  HandleBlurFunc,
  BlockType,
} from '@/@types'
import { z } from 'zod'
import { ChevronDown, TextCursorInput } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useBuilder } from '@/context/builder-provider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Switch } from '../ui/switch'

const blockCategory: FormCategoriesType = 'Field'
const blockType: BlockType = 'TextField'

type attributesType = {
  label: string
  helperText: string
  required: boolean
  placeHolder: string
}

type propertiesValidateSchemaType = z.infer<typeof propertiesValidateSchema>

const propertiesValidateSchema = z.object({
  placeHolder: z.string().trim().optional(),
  label: z.string().trim().min(2).max(255),
  required: z.boolean().default(false),
  helperText: z.string().trim().max(255).optional(),
})

export const TextFieldBlock: FormBlockType = {
  blockType,
  blockCategory,
  onCreateInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: 'Text field',
      helperText: '',
      required: false,
      placeHolder: 'Enter text',
    },
  }),
  blockBtnElement: {
    icon: TextCursorInput,
    label: 'Text field',
  },
  canvasComponent: TextFieldCanvasComponent,
  formComponent: TextFieldFormComponent,
  propertiesComponent: TextFieldPropertiesComponent,
}

type NewInstance = FormBlockInstance & {
  attributes: attributesType
}

function TextFieldCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance
}) {
  const block = blockInstance as NewInstance
  const { helperText, label, placeHolder, required } = block.attributes
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label className="text-base !font-normal">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </Label>
      <Input
        readOnly
        className="!pointer-events-none cursor-default h-10"
        placeholder={placeHolder}
      />
      {helperText && (
        <p className="text-muted-foreground text-xs">{helperText}</p>
      )}
    </div>
  )
}

type TextFieldFormComponentProps = {
  blockInstance: FormBlockInstance
  onBlur?: HandleBlurFunc
  isError?: boolean
  errorMessage?: string
}

function TextFieldFormComponent({
  blockInstance,
  onBlur,
  isError: isSubmitError,
  errorMessage,
}: TextFieldFormComponentProps) {
  const block = blockInstance as NewInstance
  const { helperText, label, placeHolder, required } = block.attributes

  const [value, setValue] = useState('')
  const [isError, setIsError] = useState(false)

  const validateField = (val: string) => {
    if (required) {
      return val.trim().length > 0 // Validation: Required fields must not be empty.
    }
    return true // If not required, always valid.
  }
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label
        className={`text-base !font-normal mb-2 ${
          isError || isSubmitError ? 'text-rose-500' : ''
        }`}
      >
        {label}
        {required && <span className="text-rose-500">*</span>}
      </Label>
      <Input
        value={value}
        onChange={event => setValue(event.target.value)}
        onBlur={event => {
          const inputValue = event.target.value
          const isValid = validateField(inputValue)
          setIsError(!isValid) // Set error state based on validation.
          if (onBlur) {
            onBlur(block.id, inputValue)
          }
        }}
        className={`h-10 ${isError || isSubmitError ? '!border-rose-500' : ''}`}
        placeholder={placeHolder}
      />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}

      {isError || isSubmitError ? (
        <p className="text-rose-500 text-[0.8rem]">
          {required && value.trim().length === 0 && 'This field is required.'}
        </p>
      ) : (
        errorMessage && (
          <p className="text-rose-500 text-[0.8rem]">{errorMessage}</p>
        )
      )}
    </div>
  )
}

function TextFieldPropertiesComponent({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number
  parentId?: string
  blockInstance: FormBlockInstance
}) {
  const block = blockInstance as NewInstance

  const { onUpdateChildBlock } = useBuilder()

  const form = useForm<propertiesValidateSchemaType>({
    resolver: zodResolver(propertiesValidateSchema),
    mode: 'onBlur',
    defaultValues: {
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
    },
  })

  useEffect(() => {
    form.reset({
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
    })
  }, [block.attributes, form])

  function setChanges(values: propertiesValidateSchemaType) {
    if (!parentId) return null
    onUpdateChildBlock({
      parentId,
      childBlockId: block.id,
      updatedBlock: {
        ...block,
        attributes: {
          ...block.attributes,
          ...values,
        },
      },
    })
  }
  return (
    <div className="w-full pb-4">
      <div className="flex w-full items-center justify-between gap-1 bg-gray-100 h-auto p-1 px-2 mb-2.5 rounded-sm">
        <span className="text-sm font-medium text-gray-600 tracking-wide">
          TextField {positionIndex}
        </span>
        <ChevronDown className="size-4" />
      </div>

      <Form {...form}>
        <form onSubmit={e => e.preventDefault()} className="w-full space-y-3">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-normal">Label</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={e => {
                      field.onChange(e)
                      setChanges({
                        ...form.getValues(),
                        label: e.target.value,
                      })
                    }}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="helperText"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-sm font-normal">Note</FormLabel>
                <div className=" w-full">
                  <FormControl>
                    <Input
                      {...field}
                      onChange={e => {
                        field.onChange(e)
                        setChanges({
                          ...form.getValues(),
                          helperText: e.target.value,
                        })
                      }}
                    />
                  </FormControl>
                  <FormDescription className="text-[11px] mt-1 pl-1">
                    Provide a short note to guide users
                  </FormDescription>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="placeHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal">
                  Placeholder
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={e => {
                      field.onChange(e)
                      setChanges({
                        ...form.getValues(),
                        placeHolder: e.target.value,
                      })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="text-end">
                <div className="flex items-center justify-between w-full gap-2">
                  <FormLabel className="text-sm font-normal">
                    Required
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={value => {
                        field.onChange(value)
                        setChanges({
                          ...form.getValues(),
                          required: value,
                        })
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
