import '@smastrom/react-rating/style.css'
import './styles.css'

import type { FormBlockType } from '@/@types'
import { defaultMaxStars } from '@/constants'
import { StarIcon } from 'lucide-react'
import { StarRatingCanvasComponent } from './star-rating-canvas-component'
import { StarRatingFormComponent } from './star-rating-form-component'
import { StarRatingPropertiesComponent } from './star-rating-properties-component'
import { blockCategory, blockType } from './types'

export const StarRatingBlock: FormBlockType = {
  blockType,
  blockCategory,
  onCreateInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: 'Star Rating',
      helperText: '',
      maxStars: defaultMaxStars,
      required: true,
    },
  }),
  blockBtnElement: {
    icon: StarIcon,
    label: 'Star Rating',
  },
  canvasComponent: StarRatingCanvasComponent,
  formComponent: StarRatingFormComponent,
  propertiesComponent: StarRatingPropertiesComponent,
}
