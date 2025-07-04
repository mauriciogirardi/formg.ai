import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'

import { CreateForm } from './_components/create-form'
import { FormListSkeleton } from './_components/form-item'
import { FormList } from './_components/form-list'
import { StatsListWrap } from './_components/stats-list-wrap'

export default function DashboardPage() {
  return (
    <div className="w-full pt-8">
      <div className="w-full max-w-6xl mx-auto pt-1 px-4 xl:px-0">
        <section className="stats-section w-full">
          <div className="flex items-center justify-between py-5">
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <CreateForm />
          </div>

          <StatsListWrap />
        </section>

        <Separator className="bg-slate-200 mt-10" />

        <section className="w-full pt-7 pb-10">
          <div className="w-full flex items-center mb-4">
            <h5 className="text-xl font-semibold tracking-tight">All Forms</h5>
          </div>

          <Suspense fallback={<FormListSkeleton />}>
            <FormList />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
