'use client'

import { FormSelect } from '@/components/form-select'
import { FormTextarea } from '@/components/form-textarea'
import { PropertyName } from '@/components/property-name'
import { Form } from '@/components/ui/form'
import { useBuilderStore } from '@/stores/builder-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  type NewInstance,
  type ParagraphPropertiesComponentProps,
  type ParagraphPropertiesSchema,
  fontSizeList,
  type fontSizeType,
  fontWeightList,
  type fontWeightType,
  paragraphValidateSchema,
} from './types'

export function ParagraphPropertiesComponent({
  positionIndex,
  parentId,
  blockInstance,
}: ParagraphPropertiesComponentProps) {
  const onUpdateChildBlock = useBuilderStore(store => store.onUpdateChildBlock)
  const block = blockInstance as NewInstance

  const form = useForm<ParagraphPropertiesSchema>({
    resolver: zodResolver(paragraphValidateSchema),
    mode: 'onBlur',
    defaultValues: {
      text: block.attributes.text,
      fontSize: block.attributes.fontSize,
      fontWeight: block.attributes.fontWeight,
    },
  })

  const setChanges = (values: ParagraphPropertiesSchema) => {
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
      <PropertyName name={`Paragraph ${positionIndex}`} />

      <Form {...form}>
        <form onSubmit={e => e.preventDefault()} className="w-full space-y-3">
          <FormTextarea
            form={form}
            name="text"
            label="Content"
            placeholder="Enter your paragraph text here"
            onValueChange={value => {
              setChanges({
                ...form.getValues(),
                text: value,
              })
            }}
          />

          <FormSelect
            form={form}
            name="fontSize"
            label="Font Size"
            placeholder="Select Font Size"
            items={fontSizeList}
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
        </form>
      </Form>
    </div>
  )
}
