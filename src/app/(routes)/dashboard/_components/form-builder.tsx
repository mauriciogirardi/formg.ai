'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { type CSSProperties, useState } from 'react'
import { Builder } from './builder'

export function FormBuilder() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div>
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
    </div>
  )
}
