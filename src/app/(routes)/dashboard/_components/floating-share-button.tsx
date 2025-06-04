'use client'
import React from 'react'
import { useBuilder } from '@/context/builder-provider'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export function FloatingShareButton() {
  const { formData } = useBuilder()

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
    <div className="fixed bottom-5 z-50 transition-transform duration-500 ease-in-out right-6">
      <Button
        onClick={copyLinkToClipboard}
        variant="outline"
        size="lg"
        className="rounded-full !bg-primary !text-white p-4 shadow-lg transition-all duration-300 hover:scale-105"
        aria-label="Copy Shareable Link"
      >
        <Copy className="size-5" />
        Share Link
      </Button>
    </div>
  )
}
