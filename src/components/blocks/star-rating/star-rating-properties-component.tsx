'use client'

import { FormInput } from '@/components/form-input'
import { FormSwitch } from '@/components/form-switch'
import { PropertyName } from '@/components/property-name'
import { Form } from '@/components/ui/form'
import { defaultMaxStars } from '@/constants'
import { useBuilder } from '@/context/builder-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  type NewInstance,
  type PropertiesValidateSchemaType,
  type StarRatingPropertiesComponentProps,
  propertiesValidateSchema,
} from './types'

export function StarRatingPropertiesComponent({
  positionIndex,
  parentId,
  blockInstance,
}: StarRatingPropertiesComponentProps) {
  const block = blockInstance as NewInstance
  const { onUpdateChildBlock } = useBuilder()

  const form = useForm<PropertiesValidateSchemaType>({
    resolver: zodResolver(propertiesValidateSchema),
    defaultValues: {
      label: block.attributes.label,
      required: block.attributes.required,
      maxStars: Number(block.attributes.maxStars) || defaultMaxStars,
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    form.reset({
      label: block.attributes.label,
      required: block.attributes.required,
      maxStars: Number(block.attributes.maxStars) || defaultMaxStars,
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
    <div className="w-full pb-4">
      <PropertyName name={`Rating ${positionIndex}`} />

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
            name="maxStars"
            label="Max Stars"
            defaultValue={defaultMaxStars}
            type="number"
            max={10}
            min={1}
            onValueChange={value => {
              setChanges({
                ...form.getValues(),
                maxStars: value,
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
