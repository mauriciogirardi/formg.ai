import { fetchAllForms } from '@/actions/form-action'
import { FormItem } from './form-item'

export async function FormList() {
  const { forms } = await fetchAllForms()

  return (
    <>
      {/* @ts-ignore  */}
      {forms?.map(form => (
        <FormItem key={form.id} {...form} />
      ))}
    </>
  )
}
