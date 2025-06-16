import {
  type BlockType,
  type FormBlockInstance,
  type FormCategoriesType,
  FormCategoriesTypeEnum,
  TypeFormsEnum,
} from '@/@types'
import { z } from 'zod'

export const blockCategory: FormCategoriesType = FormCategoriesTypeEnum.field
export const blockType: BlockType = TypeFormsEnum.paragraph

export type fontSizeType = 'small' | 'medium' | 'large'

export type fontWeightType = 'normal' | 'lighter'

type attributesType = {
  label: string
  text: string
  fontSize: fontSizeType
  fontWeight: fontWeightType
}

export const paragraphValidateSchema = z.object({
  text: z.string().trim().min(1).max(1000),
  fontSize: z.enum(['small', 'medium', 'large']).default('small'),
  fontWeight: z.enum(['normal', 'lighter']).default('normal'),
})
export type ParagraphPropertiesSchema = z.infer<typeof paragraphValidateSchema>

export type NewInstance = FormBlockInstance & {
  attributes: attributesType
}

export type ParagraphPropertiesComponentProps = {
  positionIndex?: number
  parentId?: string
  blockInstance: FormBlockInstance
}

export const fontSizeList = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
]

export const fontWeightList = [
  { value: 'light', label: 'Lighter' },
  { value: 'normal', label: 'Normal' },
]
