'use client'

import { QueryProvider } from './query-provider'
import { TooltipProvider } from './tooltip-provider'
import { Toaster } from '@/components/ui/toaster'

type ProvidersProps = {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </QueryProvider>
  )
}
