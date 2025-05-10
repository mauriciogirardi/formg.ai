import type { FormBlockInstance } from '@/@types'
import { FormBlocks } from '@/lib/form-blocks'

type ChildPropertiesComponentWrapperProps = {
  index: number
  parentId: string
  blockInstance: FormBlockInstance
}

export function ChildPropertiesComponentWrapper({
  blockInstance,
  index,
  parentId,
}: ChildPropertiesComponentWrapperProps) {
  const PropertiesComponent =
    FormBlocks[blockInstance.blockType].propertiesComponent

  if (!PropertiesComponent) return null

  return (
    <PropertiesComponent
      blockInstance={blockInstance}
      parentId={parentId}
      positionIndex={index}
    />
  )
}
