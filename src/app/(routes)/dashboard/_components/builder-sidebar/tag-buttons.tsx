import { cn } from '@/lib/utils'

export enum Tag {
  blocks = 'B',
  settings = 'S',
}

type TagButtonsProps = {
  tab: Tag
  onClickBlocks?: (tag: Tag.blocks) => void
  onClickSettings?: (tag: Tag.settings) => void
}

export function TagButtons({
  tab,
  onClickBlocks,
  onClickSettings,
}: TagButtonsProps) {
  return (
    <div className="w-full rounded-full bg-gray-100 p-1 flex flex-row gap-1 h-[39px]">
      <button
        type="button"
        className={cn(
          'p-[5px] flex-1 bg-transparent transition-colors ease-in-out rounded-full text-center font-medium text-sm',
          tab === Tag.blocks && 'bg-white'
        )}
        onClick={() => onClickBlocks?.(Tag.blocks)}
      >
        Blocks
      </button>
      <button
        type="button"
        className={cn(
          'p-[5px] flex-1 bg-transparent transition-colors ease-in-out rounded-full text-center font-medium text-sm',
          tab === Tag.settings && 'bg-white'
        )}
        onClick={() => onClickSettings?.(Tag.settings)}
      >
        Settings
      </button>
    </div>
  )
}
