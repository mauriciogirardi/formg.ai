import {
  type BlockType,
  type FormBlockInstance,
  type FormCategoriesType,
  FormCategoriesTypeEnum,
  type HandleBlurFunc,
  TypeFormsEnum,
} from '@/@types'
import { z } from 'zod'

export const propertiesValidateSchema = z.object({
  placeHolder: z.string().trim().optional(),
  label: z.string().trim().min(2).max(255),
  required: z.boolean().default(false),
  helperText: z.string().trim().max(255).optional(),
  rows: z.number().min(1).max(20).default(3),
})

export type PropertiesValidateSchemaType = z.infer<
  typeof propertiesValidateSchema
>

export const blockCategory: FormCategoriesType = FormCategoriesTypeEnum.field
export const blockType: BlockType = TypeFormsEnum.textArea

export type attributesType = {
  label: string
  helperText: string
  required: boolean
  placeHolder: string
  rows: number
}

export type NewInstance = FormBlockInstance & {
  attributes: attributesType
}

export type TextAreaCanvasComponentProps = {
  blockInstance: FormBlockInstance
}

export type TextareaFormComponentProps = {
  blockInstance: FormBlockInstance
  onBlur?: HandleBlurFunc
  isError?: boolean
  errorMessage?: string
}

export const defaultRowValue = 3
export const defaultColumnValue = 50
