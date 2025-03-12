'use client'

import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

export function FormBlockBox() {
  const [search, setSearch] = useState('')

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 py-4 text-sm">
        <Input
          placeholder="Search Blocks"
          className="placeholder:text-gray-400 shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-3 w-full">
        <div className="mb-2">
          <h5 className="text-sm text-gray-500 font-medium">Layout</h5>
        </div>

        <Separator className="bg-gray-200" />

        <div>
          <h5 className="text-sm text-gray-500 font-medium">Form</h5>
        </div>
      </div>
    </div>
  )
}
