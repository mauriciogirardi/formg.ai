import type { FormBlocksType } from '@/@types'
import { RowLayoutBlock } from '@/components/blocks/layouts/row-layout'
import { RadioSelectBlock } from '@/components/blocks/radio-select-block'
import { TextFieldBlock } from '@/components/blocks/text-field'

export const FormBlocks: FormBlocksType = {
  RowLayout: RowLayoutBlock,
  RadioSelect: RadioSelectBlock,
  TextField: TextFieldBlock,
}
