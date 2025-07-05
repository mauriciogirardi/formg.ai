'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { InfoIcon, Loader2, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createForm } from '@/actions/form-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useFormStats } from '@/hooks/use-form-stats'
import { toast } from '@/hooks/use-toast'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  description: z.string(),
})

type FormData = z.infer<typeof formSchema>

export function CreateForm() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const stats = useFormStats()
  const maxForm =
    (stats.data?.totalForms && stats.data.totalForms >= 5) || false

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const handleSubmit = async (data: FormData) => {
    const response = await createForm({
      ...data,
    })

    if (response.success) {
      setIsOpen(false)
      form.reset()

      toast({ title: 'Success', description: response.message })
      router.push(`/dashboard/form/builder/${response.form?.formId}`)
    } else {
      toast({
        title: 'Error',
        description: response.message,
        variant: 'destructive',
      })
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isOpen) {
      form.reset()
    }
  }, [isOpen])

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className="relative">
          {maxForm && (
            <Tooltip>
              <TooltipTrigger className="absolute cursor-pointer -top-4 -left-4">
                <InfoIcon className="size-5 text-rose-600" />
              </TooltipTrigger>
              <TooltipContent className="w-[200px]">
                <p>
                  Heads up! In the demo version, you can create up to 5 forms.
                  Upgrade to unlock unlimited access.
                </p>
              </TooltipContent>
            </Tooltip>
          )}

          <SheetTrigger asChild>
            <Button className="gap-1" disabled={stats.isLoading || maxForm}>
              <Plus className="size-4" />
              Create a form
            </Button>
          </SheetTrigger>
        </div>

        <SheetContent side="bottom">
          <div className="w-full max-w-5xl mx-auto">
            <SheetHeader className="text-left">
              <SheetTitle>Create New Form</SheetTitle>
              <SheetDescription>
                This will a new form. Ensure all details are accurate.
              </SheetDescription>
            </SheetHeader>

            <div className="w-full dialog-content mt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            placeholder="Form name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Form description" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full md:w-44"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Plus className="size-4" />
                      )}
                      Create
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
