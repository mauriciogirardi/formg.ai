import type { FormBlocksType } from '@/@types'
import { HeadingBlock } from '@/components/blocks/heading'
import { RowLayoutBlock } from '@/components/blocks/layouts/row-layout'
import { ParagraphBlock } from '@/components/blocks/paragraph'
import { RadioSelectBlock } from '@/components/blocks/radio'
import { StarRatingBlock } from '@/components/blocks/star-rating'
import { TextFieldBlock } from '@/components/blocks/text-field'
import { TextAreaBlock } from '@/components/blocks/textarea'
import { SelectBlock } from '@/components/blocks/select'

export const FormBlocks: FormBlocksType = {
  RowLayout: RowLayoutBlock,
  RadioSelect: RadioSelectBlock,
  TextField: TextFieldBlock,
  TextArea: TextAreaBlock,
  StarRating: StarRatingBlock,
  Paragraph: ParagraphBlock,
  Heading: HeadingBlock,
  Select: SelectBlock,
}
