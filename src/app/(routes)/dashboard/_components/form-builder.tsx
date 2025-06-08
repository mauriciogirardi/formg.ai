'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useBuilder } from '@/context/builder-provider'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { type CSSProperties, useState } from 'react'
import { Builder } from './builder'
import { BuilderDragOverlay } from './builder-drag-overlay'

export function FormBuilder() {
  const { formData, loading } = useBuilder()
  const isPublish = formData?.published || false

  if (loading) {
    return (
      <div className="w-full flex h-full justify-between">
        <Skeleton className="w-[23%] h-full" />
        <div className="py-10">
          <Skeleton className="w-[600px] h-full rounded-lg" />
        </div>
        <Skeleton className="w-[23%] h-full" />
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
