import {
  type BlockType,
  type FormBlockInstance,
  type FormCategoriesType,
  FormCategoriesTypeEnum,
  TypeFormsEnum,
} from '@/@types'
import { z } from 'zod'

export const blockCategory: FormCategoriesType = FormCategoriesTypeEnum.field
export const blockType: BlockType = TypeFormsEnum.heading

export type fontSizeType =
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | '2x-large'
  | '4x-large'

export type fontWeightType = 'normal' | 'bold' | 'bolder' | 'lighter'

export type attributesType = {
  label: string
  level: 1 | 2 | 3 | 4 | 5 | 6
  fontSize: fontSizeType
  fontWeight: fontWeightType
}

export const propertiesValidateSchema = z.object({
  label: z.string().trim().min(2).max(255),
  level: z.number().min(1).max(6).default(1),
  fontSize: z
    .enum(['small', 'medium', 'large', 'x-large', '2x-large', '4x-large'])
    .default('medium'),
  fontWeight: z.enum(['normal', 'bold', 'bolder', 'lighter']).default('normal'),
})

export type propertiesValidateSchemaType = z.infer<
  typeof propertiesValidateSchema
>

export type NewInstance = FormBlockInstance & {
  attributes: attributesType
}

export type HeadingPropertiesComponentProps = {
  positionIndex?: number
  parentId?: string
  blockInstance: FormBlockInstance
}

export const fontSizesList = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'x-large', label: 'Xtra Large' },
  { value: '2x-large', label: '2Xtra Large' },
  { value: '4x-large', label: '4Xtra Large' },
]

export const fontWeightList = [
  { value: 'normal', label: 'Normal' },
  { value: 'bold', label: 'Bold' },
  { value: 'bolder', label: 'Bolder' },
  { value: 'lighter', label: 'Lighter' },
]

export const fontLevelList = [
  { value: '1', label: 'H1' },
  { value: '2', label: 'H2' },
  { value: '3', label: 'H3' },
  { value: '4', label: 'H4' },
  { value: '5', label: 'H5' },
  { value: '6', label: 'H6' },
]
