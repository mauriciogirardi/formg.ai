'use client'

import { updatePublish } from '@/actions/form-action'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useBuilderStore } from '@/stores/builder-store'
import { Loader2, Send } from 'lucide-react'
import React, { useState } from 'react'

const PublishFormBtn = () => {
  const formData = useBuilderStore(store => store.formData)
  const setFormData = useBuilderStore(store => store.setFormData)
  const onSelectedLayout = useBuilderStore(store => store.onSelectedLayout)

  const formId = formData?.formId

  const [isLoading, setIsLoading] = useState(false)

  const togglePublishState = async () => {
    try {
      if (!formId) return
      setIsLoading(true)

      // Toggle published state
      const newPublishedState = !formData?.published
      const response = await updatePublish(formId, newPublishedState)
      if (response?.success) {
        toast({
          title: 'Success',
          description: response.message,
        })

        onSelectedLayout(null)
        setFormData({
          ...formData,
          published: response.published || false,
        })
      } else {
        toast({
          title: 'Error',
          description: response?.message || 'Something went wrong',
          variant: 'destructive',
        })
      }
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error?.message || 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isPublished = formData?.published

  return (
    <Button
      disabled={isLoading}
      size="sm"
      variant={isPublished ? 'destructive' : 'default'}
      className={cn(
        isPublished ? 'bg-rose-500 hover:bg-rose-600' : '!bg-primary',
        'text-white'
      )}
      onClick={togglePublishState}
    >
      {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send />}
      {isPublished ? 'Unpublish' : 'Publish'}
    </Button>
  )
}

export default PublishFormBtn
