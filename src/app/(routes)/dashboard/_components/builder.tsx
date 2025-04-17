import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { BuilderSidebar } from './builder-sidebar'
import { defaultBackgroundColor } from '@/constants'
import { BuilderCanvas } from './builder-canvas'
import { BuilderBlockProperties } from './builder-block-properties'

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
