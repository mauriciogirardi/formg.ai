'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useBuilderStore } from '@/stores/builder-store'
import { Loader2, Send } from 'lucide-react'
import { usePublishedMutation } from './hooks/usePublishedMutation'
import { useSaveMutation } from './hooks/useSaveMutation'

const PublishFormBtn = () => {
  const formData = useBuilderStore(store => store.formData)
  const setFormData = useBuilderStore(store => store.setFormData)
  const onSelectedLayout = useBuilderStore(store => store.onSelectedLayout)
  const blockLayouts = useBuilderStore(store => store.blockLayouts)

  const lockedBlock = blockLayouts.find(block => block.isLocked)

  const name = lockedBlock?.childBlocks?.find(
    child => child.blockType === 'Heading'
  )?.attributes?.label as string

  const description = lockedBlock?.childBlocks?.find(
    child => child.blockType === 'Paragraph'
  )?.attributes?.text as string

  const jsonBlocks = JSON.stringify(blockLayouts)

  const formId = formData?.formId
  const isPublished = formData?.published

  const { mutate: publishedMutation, isPending } = usePublishedMutation()
  const { mutateAsync: saveFormMutation, isPending: isPendingSaveForm } =
    useSaveMutation()

  const togglePublishState = async () => {
    if (!formId) return
    const newPublishedState = !formData?.published

    newPublishedState &&
      (await saveFormMutation(
        { formId, jsonBlocks, description, name },
        {
          onSuccess: data => {
            if (data.success) {
              if (data.form) {
                setFormData({
                  ...formData,
                  ...data.form,
                })
              }
            } else {
              toast({
                title: 'Error',
                description: data?.message || 'Something was wrong.',
                variant: 'destructive',
              })
            }
          },
          onError: () => {
            toast({
              title: 'Error',
              description: 'Something was wrong.',
              variant: 'destructive',
            })
          },
        }
      ))

    publishedMutation(
      {
        formId,
        newPublishedState,
      },
      {
        onSuccess: data => {
          if (data.success) {
            toast({
              title: 'Success',
              description: data.message,
            })

            onSelectedLayout(null)
            setFormData({
              ...formData,
              published: data.published || false,
            })
          } else {
            toast({
              title: 'Error',
              description: data?.message || 'Something went wrong',
              variant: 'destructive',
            })
          }
        },
        onError: () => {
          toast({
            title: 'Error',
            description: 'Something went wrong',
            variant: 'destructive',
          })
        },
      }
    )
  }

  return (
    <Button
      disabled={isPending || isPendingSaveForm}
      size="sm"
      variant={isPublished ? 'destructive' : 'default'}
      className={cn(
        isPublished ? 'bg-rose-500 hover:bg-rose-600' : '!bg-primary',
        'text-white'
      )}
      onClick={togglePublishState}
    >
      {isPending || isPendingSaveForm ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Send />
      )}
      {isPublished ? 'Unpublish' : 'Publish'}
    </Button>
  )
}

export default PublishFormBtn
