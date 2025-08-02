import {
  type BlockType,
  type FormBlockInstance,
  type FormCategoriesType,
  FormCategoriesTypeEnum,
  type FormErrorsType,
  type HandleBlurFunc,
  TypeFormsEnum,
} from '@/@types'
import { z } from 'zod'

export const blockCategory: FormCategoriesType = FormCategoriesTypeEnum.field
export const blockType: BlockType = TypeFormsEnum.select

export const propertiesValidateSchema = z.object({
  placeHolder: z.string().trim().optional(),
  label: z.string().trim().min(2).max(255),
  required: z.boolean().default(false),
  helperText: z.string().trim().max(255).optional(),
  options: z.array(z.string().min(1)),
})

export type propertiesValidateSchemaType = z.infer<
  typeof propertiesValidateSchema
>

export type FormData = z.infer<typeof propertiesValidateSchema>

export type AttributesType = {
  label: string
  helperText: string
  required: boolean
  placeHolder: string
  options: string[]
}

export type NewInstance = FormBlockInstance & {
  attributes: AttributesType
}

export type SelectPropertiesComponentProps = {
  positionIndex?: number
  parentId?: string
  blockInstance: FormBlockInstance
}

export type SelectFormComponentProps = {
  blockInstance: FormBlockInstance
  onBlur?: HandleBlurFunc
  isError?: boolean
  errorMessage?: string
  formErrors?: FormErrorsType
}
