import { FIcon } from '@/icons/f-icon'
import React from 'react'

export default function Loading() {
  return (
    <div className="w-full flex h-full items-center justify-center">
      <FIcon className="animate-pulse" size="40" />
    </div>
  )
}
