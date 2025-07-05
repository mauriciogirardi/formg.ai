'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { FIcon } from '@/icons/f-icon'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { type CSSProperties, useState } from 'react'
import { Builder } from './builder'
import { BuilderDragOverlay } from './builder-drag-overlay'
import { useBuilderStore } from '@/stores/builder-store'

export function FormBuilder() {
  const formData = useBuilderStore(store => store.formData)
  const loading = useBuilderStore(store => store.loading)
  const isPublish = formData?.published || false

  if (loading) {
    return (
      <div className="w-full flex h-full items-center justify-center">
        <FIcon className="animate-pulse" size="40" />
      </div>
    )
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(!isPublish)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  })

  return (
    <div>
      <DndContext sensors={useSensors(mouseSensor)}>
        <BuilderDragOverlay />
        <SidebarProvider
          open={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
          className="h-[calc(100vh_-_64px)]"
          style={
            {
              '--sidebar-width': '300px',
              '--sidebar-height': '40px',
            } as CSSProperties
          }
        >
          <Builder isSidebarOpen={isSidebarOpen} />
        </SidebarProvider>
      </DndContext>
    </div>
  )
}
