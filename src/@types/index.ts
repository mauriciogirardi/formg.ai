import type { Form, FormSettings } from '@prisma/client'
import type { ElementType, FC } from 'react'

export type FormWithSettings = Form & { settings: FormSettings }

export type PositionLayout = 'above' | 'below'

export type FormCategoriesType = 'Layout' | 'Field'
export type BlockType = 'RowLayout' | 'RadioSelect'
export type FormBlockType = {
  blockCategory: FormCategoriesType
  blockType: BlockType
  onCreateInstance: (id: string) => FormBlockInstance
  blockBtnElement: {
    icon: ElementType
    label: string
  }
  canvasComponent: FC<{ blockInstance: FormBlockInstance }>
  formComponent: FC
  propertiesComponent: FC
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
