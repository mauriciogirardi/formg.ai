'use client'

import { FormInput } from '@/components/form-input'
import { FormSwitch } from '@/components/form-switch'
import { PropertyName } from '@/components/property-name'
import { Form } from '@/components/ui/form'
import { useBuilderStore } from '@/stores/builder-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  type NewInstance,
  type TextFieldPropertiesComponentProps,
  propertiesValidateSchema,
  type propertiesValidateSchemaType,
} from './types'

export function TextFieldPropertiesComponent({
  positionIndex,
  parentId,
  blockInstance,
}: TextFieldPropertiesComponentProps) {
  const block = blockInstance as NewInstance
  const onUpdateChildBlock = useBuilderStore(store => store.onUpdateChildBlock)

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
      <PropertyName name={`TextField ${positionIndex}`} />

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
