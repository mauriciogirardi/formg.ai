import type { FormBlockInstance } from '@/@types'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Key } from 'lucide-react'

type AllRepondesProps = {
  blocks: FormBlockInstance[]
  responses: {
    formId: number
    id: number
    createdAt: Date
    updatedAt: Date
    jsonResponse: string
  }[]
}

export function AllRepondes({ blocks, responses }: AllRepondesProps) {
  const childBlockMap = blocks
    .flatMap(block => block.childBlocks || [])
    .reduce(
      (acc, childBlock) => {
        if (childBlock) {
          acc[childBlock.id] = childBlock?.attributes?.label || 'No label'
        }
        return acc
      },
      {} as Record<string, string>
    )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-3">
      {responses.map(response => {
        const parsedResponses = JSON.parse(response.jsonResponse) as {
          id: string
          responseValue: string
        }
        return (
          <Card key={response.id} className="bg-white p-3 mb-2 w-full">
            <CardContent className="pb-0 px-1">
              <div className="space-y-2">
                <div className="pb-2 w-full flex items-center gap-2 border-b border-gray-200">
                  <h4 className="font-semibold">Question/Answer</h4>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(response.createdAt).toLocaleString()}
                  </span>
                </div>

                {Object.entries(parsedResponses).map(([key, value]) => {
                  return (
                    <div key={key} className="flex-col">
                      <div className="font-medium text-base mb-[2px] text-gray-800">
                        {childBlockMap[key] || 'Unknown Field'}
                      </div>
                      <div className="text-sm pl-1 text-gray-600">
                        - {value}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
