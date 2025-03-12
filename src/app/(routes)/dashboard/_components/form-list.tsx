import { fetchAllForms } from '@/actions/form-action'
import { FormItem } from './form-item'

export async function FormList() {
  const { forms } = await fetchAllForms()

  return (
    <>
      {forms?.map(form => (
        <FormItem key={form.id} {...form} />
      ))}
    </>
  )
}
