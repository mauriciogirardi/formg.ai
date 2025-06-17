'use client'

import { FormError } from '@/components/form-error'
import { FormHelperText } from '@/components/form-helper-text'
import { FormLabel } from '@/components/form-label'
import { defaultPrimaryColor } from '@/constants'
import { validateFieldNumber } from '@/utils'
import { Rating } from '@smastrom/react-rating'
import { useState } from 'react'
import { StarDrawing } from './star-drawing'
import type { NewInstance, StarRatingFormComponentProps } from './types'

export function StarRatingFormComponent({
  blockInstance,
  onBlur,
  isError: isSubmitError,
  errorMessage,
}: StarRatingFormComponentProps) {
  const block = blockInstance as NewInstance
  const { label, required, maxStars, helperText } = block.attributes

  const [rating, setRating] = useState(0)
  const [isError, setIsError] = useState(false)

  const handleStarChange = (newRating: number) => {
    setRating(newRating)
    const isValid = validateFieldNumber(newRating, required)
    setIsError(!isValid)
    onBlur?.(block.id, newRating?.toString())
  }

  const error = isError || isSubmitError

  return (
    <div className="flex flex-col gap-2 w-full mb-1">
      <FormLabel label={label} required={required} error={error} />
      <div className="flex items-center gap-10 justify-center">
        <Rating
          style={{ maxWidth: 420 }}
          value={rating}
          onChange={handleStarChange}
          items={maxStars}
          readOnly={false}
          className="!fill-primary size-8"
          radius="large"
          spaceBetween="large"
          itemStyles={{
            itemShapes: StarDrawing,
            activeFillColor: defaultPrimaryColor,
            inactiveFillColor: '#fff',
            activeStrokeColor: defaultPrimaryColor,
            inactiveStrokeColor: error ? '#ef4444' : defaultPrimaryColor,
            itemStrokeWidth: 1,
          }}
        />
      </div>

      <FormHelperText text={helperText} />
      <FormError
        error={error}
        errorMessage={errorMessage}
        required={required && rating === 0}
      />
    </div>
  )
}
