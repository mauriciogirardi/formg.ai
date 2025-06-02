import React from 'react'
import type { FormBlockInstance } from '@/@types'
import { fetchPublishFormById } from '@/actions/form-action'
import { FormSubmit } from '../../_components/form-submit'
import { NotAvailable } from '../../_components/not-available'

const Page = async ({ params }: { params: { formId: string } }) => {
  const { formId } = params

  const { form } = await fetchPublishFormById(formId)

  if (!form) return <NotAvailable />

  const blocks = JSON.parse(form.jsonBlocks) as FormBlockInstance[]
  return <FormSubmit formId={formId} blocks={blocks} />
}

export default Page
