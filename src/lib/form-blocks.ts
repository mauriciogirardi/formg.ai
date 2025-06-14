import type { FormBlocksType } from '@/@types'
import { HeadingBlock } from '@/components/blocks/heading-block'
import { RowLayoutBlock } from '@/components/blocks/layouts/row-layout'
import { ParagraphBlock } from '@/components/blocks/paragraph-block'
import { RadioSelectBlock } from '@/components/blocks/radio-select-block'
import { StarRatingBlock } from '@/components/blocks/star-rating-block'
import { TextFieldBlock } from '@/components/blocks/text-field'
import { TextAreaBlock } from '@/components/blocks/textarea'

export const FormBlocks: FormBlocksType = {
  RowLayout: RowLayoutBlock,
  RadioSelect: RadioSelectBlock,
  TextField: TextFieldBlock,
  TextArea: TextAreaBlock,
  StarRating: StarRatingBlock,
  Paragraph: ParagraphBlock,
  Heading: HeadingBlock,
}
