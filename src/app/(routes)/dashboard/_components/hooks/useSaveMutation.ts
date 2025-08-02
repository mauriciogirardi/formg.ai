import type { TForm } from '@/@types'
import { saveForm } from '@/actions/form-action'
import { useMutation } from '@tanstack/react-query'

export type Params = {
  formId: string
  jsonBlocks: string
  description?: string
  name?: string
}

export type Response = {
  success: boolean
  message: string
  form?: TForm
}

export function useSaveMutation() {
  const data = useMutation<Response, Error, Params>({
    mutationKey: ['save-form'],
    mutationFn: async ({ jsonBlocks, formId, description, name }) => {
      return await saveForm({ formId, jsonBlocks, description, name })
    },
  })

  return data
}
