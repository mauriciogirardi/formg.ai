import { prisma } from '@/lib/prisma'

export type FormStatsResponse = {
  views: number
  totalForms: number
  totalResponses: number
  conversionRate: number
  engagementRate: number
}

export async function getFormStatsByUserId(
  userId: string
): Promise<FormStatsResponse> {
  const { _sum, _count } = await prisma.form.aggregate({
    where: { userId },
    _sum: { views: true, responses: true },
    _count: { id: true },
  })

  const viewsResponse = await prisma.formView.count({
    where: {
      form: {
        userId,
      },
    },
  })

  const views = viewsResponse ?? 2
  const totalResponses = _sum.responses ?? 0
  const totalForms = _count?.id ?? 0
  const conversionRate = views > 0 ? (totalResponses / views) * 100 : 0
  const engagementRate =
    totalForms > 0 ? (totalResponses / totalForms) * 100 : 0

  return {
    views,
    totalForms,
    totalResponses,
    conversionRate,
    engagementRate,
  }
}
