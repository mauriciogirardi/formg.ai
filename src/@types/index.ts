//@ts-ignore
import type { Form, FormSettings } from '@prisma/client'
import type { ElementType, FC } from 'react'

export type FormWithSettings = Form & { settings: FormSettings }

export enum TypeFormsEnum {
  rowLayout = 'ROW_LAYOUT',
  radioSelect = 'RADIO_SELECT',
  textField = 'TEXT_FIELD',
  textArea = 'TEXTAREA',
  starRating = 'STAR_RATING',
  heading = 'HEADING',
  paragraph = 'PARAGRAPH',
}

export enum TypeCategoryEnum {
  layout = 'LAYOUT',
  field = 'FIELD',
}

export enum TypePositionEnum {
  above = 'ABOVE',
  below = 'BELOW',
}

export type PositionLayout = 'above' | 'below'

export type FormCategoriesType = 'Layout' | 'Field'
export type BlockType =
  | 'RowLayout'
  | 'RadioSelect'
  | 'TextField'
  | 'TextArea'
  | 'StarRating'
  | 'Heading'
  | 'Paragraph'

export type FormBlockType = {
  blockCategory: FormCategoriesType
  blockType: BlockType
  onCreateInstance: (id: string) => FormBlockInstance
  blockBtnElement: {
    icon: ElementType
    label: string
  }
  canvasComponent: FC<{ blockInstance: FormBlockInstance }>
  formComponent: FC<{
    blockInstance: FormBlockInstance
    onBlur?: HandleBlurFunc
    isError?: boolean
    errorMessage?: string
    formErrors?: FormErrorsType
  }>
  propertiesComponent: FC<{
    blockInstance: FormBlockInstance
    positionIndex?: number
    parentId?: string
  }>
}

export type FormBlockInstance = {
  id: string
  blockType: BlockType
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  attributes?: Record<string, any>
  isLocked?: boolean
  childBlocks?: FormBlockInstance[]
}

export type FormBlocksType = {
  [key in BlockType]: FormBlockType
}

export type HandleBlurFunc = (key: string, value: string) => void

export type FormErrorsType = {
  [key: string]: string
}
