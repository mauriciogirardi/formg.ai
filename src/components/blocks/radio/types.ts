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

export const blockType: BlockType = TypeFormsEnum.radioSelect
export const blockCategory: FormCategoriesType = FormCategoriesTypeEnum.field

export type RadioSelectPropertiesComponentProps = {
  positionIndex?: number
  parentId?: string
  blockInstance: FormBlockInstance
}

export const propertiesValidateSchema = z.object({
  label: z.string().trim().min(2).max(225),
  required: z.boolean().default(false),
  options: z.array(z.string().min(1)),
})

export type FormData = z.infer<typeof propertiesValidateSchema>

export type AttributesType = {
  label: string
  options: string[]
  required: boolean
}

export type RadioSelectCanvasComponentProps = {
  blockInstance: FormBlockInstance
}

export type RadioSelectFormComponentProps = {
  blockInstance: FormBlockInstance
  onBlur?: HandleBlurFunc
  isError?: boolean
  errorMessage?: string
  formErrors?: FormErrorsType
}
