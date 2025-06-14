import { ChevronDownIcon } from 'lucide-react'

type PropertyNameProps = {
  name: string
}

export function PropertyName({ name }: PropertyNameProps) {
  return (
    <div className="w-full flex flex-row items-center justify-between gap-1 bg-gray-100 h-auto p-1 px-2 mb-[10px]">
      <span className="text-sm font-medium text-gray-600 tracking-wider">
        {name}
      </span>
      <ChevronDownIcon className="w-4 h-4" />
    </div>
  )
}
