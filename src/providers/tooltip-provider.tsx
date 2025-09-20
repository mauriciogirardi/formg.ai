'use client'

import { TooltipProvider as TooltipProviderUI } from '@/components/ui/tooltip'

type TooltipProviderProps = {
  children: React.ReactNode
}

export function TooltipProvider({ children }: TooltipProviderProps) {
  return <TooltipProviderUI>{children}</TooltipProviderUI>
}
