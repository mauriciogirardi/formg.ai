'use client'

import { useBuilderStore } from '@/stores/builder-store'
import { FormBuilder } from '../../../_components/form-builder'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { FIcon } from '@/icons/f-icon'

export default function BuilderPage() {
  const params = useParams()
  const formId = params.formId as string
  const fetchFormById = useBuilderStore(store => store.fetchFormById)

  const { isLoading } = useQuery({
    queryKey: [formId, 'form'],
    queryFn: () => fetchFormById(formId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 30, // 30 minutos
  })

  if (isLoading) {
    return (
      <div className="w-full flex h-full items-center justify-center">
        <FIcon className="animate-pulse" size="40" />
      </div>
    )
  }

  return <FormBuilder />
}
