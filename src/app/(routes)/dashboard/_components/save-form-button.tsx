'use client'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2Icon, SaveIcon } from 'lucide-react'
import { useBuilder } from '@/context/builder-provider'
import { saveForm } from '@/actions/form-action'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export function SaveFormButton() {
  const { formData, setFormData, blockLayouts } = useBuilder()
  const formId = formData?.formId

  const [isPending, startTransition] = useTransition()

  const handleSaveForm = () =>
    startTransition(async () => {
      try {
        if (!formId) return

        const lockedBlock = blockLayouts.find(block => block.isLocked)

        const name = lockedBlock?.childBlocks?.find(
          child => child.blockType === 'Heading'
        )?.attributes?.label as string

        const description = lockedBlock?.childBlocks?.find(
          child => child.blockType === 'Paragraph'
        )?.attributes?.text as string

        const jsonBlocks = JSON.stringify(blockLayouts)

        const response = await saveForm({
          formId,
          jsonBlocks,
          description,
          name,
        })

        if (response.success) {
          toast({
            title: 'Success',
            description: response.message,
          })
          if (response.form) {
            setFormData({
              ...formData,
              ...response.form,
            })
          }
          return
        }

        toast({
          title: 'Error',
          description: response.message || 'Something was wrong.',
          variant: 'destructive',
        })
      } catch (error) {
        toast({
          title: 'Error',
          //@ts-ignore
          description: error?.message || 'Something was wrong.',
          variant: 'destructive',
        })
      }
    })

  return (
    <Button
      size="sm"
      variant="outline"
      className={cn(
        'text-primary border-primary hover:bg-primary hover:text-white',
        formData?.published && 'cursor-default pointer-events-none'
      )}
      disabled={isPending}
      onClick={handleSaveForm}
    >
      {isPending ? <Loader2Icon className="animate-spin" /> : <SaveIcon />}
      Save
    </Button>
  )
}
