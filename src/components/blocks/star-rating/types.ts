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
export const blockType: BlockType = TypeFormsEnum.starRating

export type attributesType = {
  label: string
  helperText: string
  required: boolean
  maxStars: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

export const propertiesValidateSchema = z.object({
  label: z.string().trim().min(2).max(255),
  maxStars: z.coerce.number().min(1).max(10).default(5),
  required: z.boolean().default(false),
})

export type PropertiesValidateSchemaType = z.infer<
  typeof propertiesValidateSchema
>

export type NewInstance = FormBlockInstance & {
  attributes: attributesType
}

export type StarRatingCanvasComponentProps = {
  blockInstance: FormBlockInstance
}

export type StarRatingFormComponentProps = {
  blockInstance: FormBlockInstance
  onBlur?: HandleBlurFunc
  isError?: boolean
  errorMessage?: string
}

export type StarRatingPropertiesComponentProps = {
  positionIndex?: number
  parentId?: string
  blockInstance: FormBlockInstance
}
