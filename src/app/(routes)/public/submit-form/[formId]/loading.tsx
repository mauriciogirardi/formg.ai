import { Loader, Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className="w-full flex h-screen items-center justify-center">
      <Loader2 size="3rem" className="animate-spin" />
    </div>
  )
}
