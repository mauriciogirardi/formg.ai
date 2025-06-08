import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { defaultBackgroundColor } from '@/constants'
import { BuilderBlockProperties } from './builder-block-properties'
import { BuilderCanvas } from './builder-canvas'
import { BuilderSidebar } from './builder-sidebar'

type BuilderProps = {
  isSidebarOpen: boolean
}

export function Builder({ isSidebarOpen }: BuilderProps) {
  return (
    <>
      <BuilderSidebar />
      <SidebarInset className="p-0 flex-1 ">
        <div className={`w-full h-full bg-[${defaultBackgroundColor}]`}>
          <SidebarTrigger className="absolute top-0 z-50" />
          <BuilderCanvas />
        </div>
      </SidebarInset>
      <BuilderBlockProperties />
    </>
  )
}
