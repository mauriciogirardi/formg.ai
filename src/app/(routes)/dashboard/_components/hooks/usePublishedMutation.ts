import { updatePublish } from '@/actions/form-action'
import { useMutation } from '@tanstack/react-query'

export type PublishedParams = {
  formId: string
  newPublishedState: boolean
}

export type PublishedResponse = {
  success: boolean
  message: string
  published?: boolean
}

export function usePublishedMutation() {
  const data = useMutation<PublishedResponse, Error, PublishedParams>({
    mutationKey: ['published'],
    mutationFn: async ({ newPublishedState, formId }) =>
      await updatePublish(formId, newPublishedState),
  })

  return data
}
