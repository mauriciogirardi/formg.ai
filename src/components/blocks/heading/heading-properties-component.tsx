'use client'

import { FormInput } from '@/components/form-input'
import { FormSelect } from '@/components/form-select'
import { PropertyName } from '@/components/property-name'
import { Form } from '@/components/ui/form'
import { useBuilderStore } from '@/stores/builder-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  type HeadingPropertiesComponentProps,
  type NewInstance,
  fontLevelList,
  type fontSizeType,
  fontSizesList,
  fontWeightList,
  type fontWeightType,
  propertiesValidateSchema,
  type propertiesValidateSchemaType,
} from './types'

export function HeadingPropertiesComponent({
  positionIndex,
  parentId,
  blockInstance,
}: HeadingPropertiesComponentProps) {
  const block = blockInstance as NewInstance
  const onUpdateChildBlock = useBuilderStore(store => store.onUpdateChildBlock)

  const form = useForm<propertiesValidateSchemaType>({
    resolver: zodResolver(propertiesValidateSchema),
    defaultValues: {
      label: block.attributes.label,
      fontSize: block.attributes.fontSize,
      fontWeight: block.attributes.fontWeight,
      level: block.attributes.level || 1,
    },
    mode: 'onBlur',
  })

  useEffect(() => {
    form.reset({
      label: block.attributes.label,
      fontSize: block.attributes.fontSize,
      fontWeight: block.attributes.fontWeight,
      level: block.attributes.level || 1,
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
      <PropertyName name={`Heading ${positionIndex}`} />

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

          <FormSelect
            form={form}
            name="fontSize"
            label="Font Size"
            placeholder="Select Font Size"
            items={fontSizesList}
            onValueChange={value => {
              setChanges({
                ...form.getValues(),
                fontSize: value as fontSizeType,
              })
            }}
          />

          <FormSelect
            form={form}
            name="fontWeight"
            label="Weight"
            placeholder="Select Font Weight"
            items={fontWeightList}
            onValueChange={value => {
              setChanges({
                ...form.getValues(),
                fontWeight: value as fontWeightType,
              })
            }}
          />

          <FormSelect
            form={form}
            name="level"
            label="Level"
            placeholder="Select Heading Level"
            items={fontLevelList}
            onValueChange={value => {
              setChanges({
                ...form.getValues(),
                level: Number(value),
              })
            }}
          />
        </form>
      </Form>
    </div>
  )
}
