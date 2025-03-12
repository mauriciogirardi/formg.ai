'use client'

import { useEffect, useState } from 'react'
import { Loader2, Plus } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createForm } from '@/actions/form-action'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  description: z.string(),
})

type FormData = z.infer<typeof formSchema>

export function CreateForm() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

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
      toast.success('Success', { description: response.message })
      router.push(`/dashboard/form/builder/${response.form?.formId}`)
    } else {
      toast.error('Error', { description: response.message })
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
        <SheetTrigger asChild>
          <Button className="gap-1">
            <Plus className="size-4" />
            Create a form
          </Button>
        </SheetTrigger>

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
