'use client'

import type { FormBlockInstance } from '@/@types'
import { FormInput } from '@/components/form-input'
import { FormSwitch } from '@/components/form-switch'
import { PropertyName } from '@/components/property-name'
import { Form } from '@/components/ui/form'
import { useBuilder } from '@/context/builder-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  type NewInstance,
  type PropertiesValidateSchemaType,
  defaultRowValue,
  propertiesValidateSchema,
} from './types'

export function TextareaPropertiesComponent({
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

  const form = useForm<PropertiesValidateSchemaType>({
    resolver: zodResolver(propertiesValidateSchema),
    defaultValues: {
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
      rows: block.attributes.rows,
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    form.reset({
      label: block.attributes.label,
      helperText: block.attributes.helperText,
      required: block.attributes.required,
      placeHolder: block.attributes.placeHolder,
      rows: block.attributes.rows,
    })
  }, [block.attributes, form])

  function setChanges(values: PropertiesValidateSchemaType) {
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
    <div className="w-full  pb-4">
      <PropertyName name={`Textarea ${positionIndex}`} />

      <Form {...form}>
        <form onSubmit={e => e.preventDefault()} className="w-full space-y-3">
          <FormInput
            form={form}
            name="label"
            label="Label"
            onValueChange={value => {
              setChanges({
                ...form.getValues(),
                label: value,
              })
            }}
          />

          <FormInput
            form={form}
            name="helperText"
            label="Note"
            description="Provide a short note to guide users"
            onValueChange={value => {
              setChanges({
                ...form.getValues(),
                helperText: value,
              })
            }}
          />

          <FormInput
            form={form}
            name="placeHolder"
            label="Placeholder"
            onValueChange={value => {
              setChanges({
                ...form.getValues(),
                placeHolder: value,
              })
            }}
          />

          <FormInput
            form={form}
            name="rows"
            label="Rows"
            type="number"
            defaultValue={defaultRowValue}
            onValueChange={value => {
              setChanges({
                ...form.getValues(),
                rows: value,
              })
            }}
          />

          <FormSwitch
            form={form}
            name="required"
            onValueChange={value => {
              setChanges({
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
