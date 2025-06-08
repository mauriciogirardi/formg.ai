import type { FormBlockInstance } from '@/@types'
import { fetchAllResponseByFormId } from '@/actions/form-action'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { LinkIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { AllRepondes } from '../_components/all-responds'

type RespondsPageProps = {
  params: {
    formId: string
  }
}

export default async function RespondsPage({ params }: RespondsPageProps) {
  const { formId } = params
  const { form } = await fetchAllResponseByFormId(formId)

  if (!form) {
    return (
      <div className="w-full h-[50vh] flex items-center">
        Error Occurred, Refresh
      </div>
    )
  }
  const blocks = JSON.parse(form?.jsonBlocks) as FormBlockInstance[]
  const responses = form?.formResponses || []

  return (
    <main>
      <div className="w-full pt-8">
        <div className="w-full max-w-6xl mx-auto pt-1 px-4 md:px-0">
          <div className="w-full flex items-center justify-between py-5">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-800">
              ({responses?.length}) Responses
            </h1>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/public/submit-form/${formId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full max-w-44 !bg-primary">
                <LinkIcon />
                Visit Link
              </Button>
            </Link>
          </div>

          <div className="mt-10">
            <Separator className="!border-[#eee] !bg-[#eee]" />
            <AllRepondes blocks={blocks} responses={responses} />
          </div>
        </div>
      </div>
    </main>
  )
}
