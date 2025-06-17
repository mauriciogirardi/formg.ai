import { FormLabel } from '@/components/form-label'
import { defaultPrimaryColor } from '@/constants'
import { Rating } from '@smastrom/react-rating'
import { StarDrawing } from './star-drawing'
import type { NewInstance, StarRatingCanvasComponentProps } from './types'

export function StarRatingCanvasComponent({
  blockInstance,
}: StarRatingCanvasComponentProps) {
  const block = blockInstance as NewInstance
  const { label, required, maxStars, helperText } = block.attributes

  return (
    <div className="flex flex-col gap-2 w-full">
      <FormLabel label={label} required={required} />

      <div className="flex items-center gap-10 justify-center">
        <Rating
          style={{ maxWidth: 420 }}
          value={0}
          items={maxStars}
          radius="large"
          spaceBetween="large"
          readOnly={true}
          className="!fill-primary size-8"
          itemStyles={{
            itemShapes: StarDrawing,
            activeFillColor: defaultPrimaryColor,
            inactiveFillColor: '#fff',
            activeStrokeColor: defaultPrimaryColor,
            inactiveStrokeColor: defaultPrimaryColor,
            itemStrokeWidth: 1,
          }}
        />
      </div>
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  )
}
