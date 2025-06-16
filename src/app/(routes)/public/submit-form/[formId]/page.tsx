import type { FormBlockInstance } from '@/@types'
import { countViews, fetchPublishFormById } from '@/actions/form-action'
import React from 'react'
import { FormSubmit } from '../../_components/form-submit'
import { NotAvailable } from '../../_components/not-available'

const Page = async ({ params }: { params: { formId: string } }) => {
  const { formId } = params

  const { form } = await fetchPublishFormById(formId)
  await countViews(formId)

  if (!form) return <NotAvailable />

  const blocks = JSON.parse(form.jsonBlocks) as FormBlockInstance[]
  return <FormSubmit formId={formId} blocks={blocks} />
}

export default Page
