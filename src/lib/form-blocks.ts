import type { FormBlocksType } from '@/@types'
import { RowLayoutBlock } from '@/components/blocks/layouts/row-layout'
import { RadioSelectBlock } from '@/components/blocks/radio-select-block'
import { StarRatingBlock } from '@/components/blocks/star-rating-block'
import { TextFieldBlock } from '@/components/blocks/text-field'
import { TextAreaBlock } from '@/components/blocks/textarea-block'

export const FormBlocks: FormBlocksType = {
  RowLayout: RowLayoutBlock,
  RadioSelect: RadioSelectBlock,
  TextField: TextFieldBlock,
  TextArea: TextAreaBlock,
  StarRating: StarRatingBlock,
}
