'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { useBuilderStore } from '@/stores/builder-store'
import { Copy } from 'lucide-react'
import React from 'react'

export function FloatingShareButton() {
  const formData = useBuilderStore(store => store.formData)

  const copyLinkToClipboard = () => {
    const shareableLink = `${process.env.NEXT_PUBLIC_APP_URL}/public/submit-form/${formData?.formId}`
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        toast({
          title: 'Link Copied!',
          description: 'The shareable link has been copied to your clipboard.',
        })
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Failed to copy the link. Please try again.',
          variant: 'destructive',
        })
      })
  }

  if (!formData?.published) return

  return (
    <Button
      onClick={copyLinkToClipboard}
      variant="outline"
      size="sm"
      className=""
      aria-label="Copy Shareable Link"
    >
      <Copy className="size-5" />
      Link
    </Button>
  )
}
