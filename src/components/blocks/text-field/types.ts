import {
  type BlockType,
  type FormBlockInstance,
  type FormCategoriesType,
  FormCategoriesTypeEnum,
  type HandleBlurFunc,
  TypeFormsEnum,
} from '@/@types'
import { z } from 'zod'

export const blockCategory: FormCategoriesType = FormCategoriesTypeEnum.field
export const blockType: BlockType = TypeFormsEnum.textField

export type attributesType = {
  label: string
  helperText: string
  required: boolean
  placeHolder: string
}

export type propertiesValidateSchemaType = z.infer<
  typeof propertiesValidateSchema
>

export const propertiesValidateSchema = z.object({
  placeHolder: z.string().trim().optional(),
  label: z.string().trim().min(2).max(255),
  required: z.boolean().default(false),
  helperText: z.string().trim().max(255).optional(),
})

export type NewInstance = FormBlockInstance & {
  attributes: attributesType
}

export type TextFieldFormComponentProps = {
  blockInstance: FormBlockInstance
  onBlur?: HandleBlurFunc
  isError?: boolean
  errorMessage?: string
}

export type TextFieldPropertiesComponentProps = {
  positionIndex?: number
  parentId?: string
  blockInstance: FormBlockInstance
}
