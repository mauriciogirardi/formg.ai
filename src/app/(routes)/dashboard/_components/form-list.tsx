import { fetchAllForms } from '@/actions/form-action'
import { InfoIcon } from 'lucide-react'
import { FormItem } from './form-item'

export async function FormList() {
  const { forms } = await fetchAllForms()

  const amountForms = forms?.length ?? 0

  if (amountForms <= 0) {
    return (
      <div className="flex items-center justify-center w-full mt-12">
        <div className="flex flex-col w-[300px] items-center justify-center">
          <InfoIcon className="size-6 text-purple-400 mb-3" />
          <span className="text-sm text-gray-500">Oops! No forms found.</span>
          <span className="text-sm text-gray-500">
            How about creating your first one now?
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5">
      {/* @ts-ignore  */}
      {forms?.map(form => (
        <FormItem key={form.id} {...form} />
      ))}
    </div>
  )
}
