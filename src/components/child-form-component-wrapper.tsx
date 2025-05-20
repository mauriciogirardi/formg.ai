import type {
  FormBlockInstance,
  FormErrorsType,
  HandleBlurFunc,
} from '@/@types'
import { FormBlocks } from '@/lib/form-blocks'

type ChildFormComponentWrapperProps = {
  blockInstance: FormBlockInstance
  onBlur?: HandleBlurFunc
  isError?: boolean
  errorMessage?: string
}

export function ChildFormComponentWrapper({
  blockInstance,
  errorMessage,
  isError,
  onBlur,
}: ChildFormComponentWrapperProps) {
  const FormComponent = FormBlocks[blockInstance.blockType]?.formComponent
  if (!FormComponent) return null

  return (
    <FormComponent
      blockInstance={blockInstance}
      isError={isError}
      errorMessage={errorMessage}
      onBlur={onBlur}
    />
  )
}
