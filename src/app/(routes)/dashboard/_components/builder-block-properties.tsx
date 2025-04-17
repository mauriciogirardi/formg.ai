import { Button } from '@/components/ui/button'
import { EyeIcon, SaveIcon, SendIcon } from 'lucide-react'

export function BuilderBlockProperties() {
  return (
    <div className="relative w-[320px] hidden xl:flex">
      <div className="fixed right-0 w-[320px] bg-white border-l shadow-sm h-screen pb-36 mt-0 scrollbar overflow-auto">
        <div className="flex flex-col w-full items-center h-auto min-h-full">
          <div className="w-full flex items-center bg-white pb-2 pt-3 sticky border-b border-gray-200 top-0 gap-2 px-2">
            <Button
              size="sm"
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white"
            >
              <EyeIcon />
              Preview
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white"
            >
              <SaveIcon />
              Save
            </Button>
            <Button size="sm">
              <SendIcon />
              Publish
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
