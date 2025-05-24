'use client'

import type { FormBlockInstance } from '@/@types'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { useBuilder } from '@/context/builder-provider'
import { toast } from '@/hooks/use-toast'
import { AIChatSession } from '@/lib/google-ai'
import { generateUniqueId } from '@/lib/helpers'
import { generateFormQuestionPrompt } from '@/lib/prompt'
import { Loader2Icon, SparklesIcon } from 'lucide-react'
import { useState } from 'react'

export function IAAssistanceButton() {
  const { blockLayouts, setBlockLayouts, formData } = useBuilder()
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userRequest, setUserRequest] = useState('')

  const handleGenerateFormQuestionWithAi = async () => {
    if (!userRequest) {
      toast({
        title: 'Please enter a request.',
      })
      return
    }

    try {
      setLoading(true)
      const formTitle = formData?.name ?? ''
      const formDescription = formData?.description ?? ''

      const PROMPT = generateFormQuestionPrompt(
        userRequest,
        formTitle,
        formDescription,
        blockLayouts
      )

      const result = await AIChatSession.sendMessage(PROMPT)
      const responseText = result.response.text()
      const parsedResponse = JSON?.parse(responseText)
      const actionType = parsedResponse.actionType
      const generatedBlocks = parsedResponse.blocks
      const addUniqueIdToGeneratedBlocks = addUniqueIds(generatedBlocks)

      setBlockLayouts(prevBlocks => {
        if (actionType === 'addQuestions') {
          return [...prevBlocks, ...addUniqueIdToGeneratedBlocks]
        }
        if (actionType === 'createForm') {
          return addUniqueIdToGeneratedBlocks
        }
        console.warn(`Unhandled actionType: ${actionType}`)
        return prevBlocks
      })

      setOpen(false)
      setUserRequest('')
    } catch (error) {
      console.error('handleGenerateFormQuestionWithAi', error)
      toast({
        title: 'Failed to generate summary.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  function addUniqueIds(blocks: FormBlockInstance[]) {
    for (const block of blocks) {
      block.id = generateUniqueId()

      if (block?.childBlocks) {
        for (const child of block.childBlocks) {
          child.id = generateUniqueId()
        }
      }
    }

    return blocks
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="rounded-lg bg-primary/20 border-none p-4 shadow-sm text-primary hover:text-white"
          aria-label="AI assistance"
        >
          <SparklesIcon className="size-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        forceMount
        align="start"
        side="right"
      >
        <div className="flex flex-col bg-white border-2 w-[390px] border-purple-200 rounded-lg px-5 pb-3.5 pt-5 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-primary">
              Ask to generate form or questions
            </span>

            <span className="whitespace-nowrap text-xs py-1 px-1.5 bg-gray-200 text-gray-600 rounded-sm">
              Beta
            </span>
          </div>

          <div className="mt-6">
            <Textarea
              className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-sm focus:ring-primary placeholder:text-gray-500"
              placeholder="Describe the form or questions you want to generate with AI..."
              value={userRequest}
              rows={4}
              spellCheck="false"
              onChange={e => {
                setUserRequest(e.target.value)
              }}
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-400 font-medium hover:bg-transparent hover:text-purple-500 underline text-sm ml-1"
              onClick={() => setShow(p => !p)}
            >
              {show ? 'hide tips' : 'Tips'}
            </Button>
            <Button
              className="px-3 py-2 font-medium"
              size="sm"
              type="button"
              disabled={loading}
              onClick={handleGenerateFormQuestionWithAi}
            >
              <SparklesIcon />
              Generate
              {loading && <Loader2Icon className="size-4 animate-spin" />}
            </Button>
          </div>

          {show && (
            <div className="flex flex-col rounded border border-purple-200  bg-purple-100 text-purple-500 p-3 mt-4 mb-1">
              <div className="flex font-semibold text-sm mb-1">
                Let the AI know:
              </div>

              <ul className="tips-options text-sm  mx-4 space-y-2">
                <li>
                  What Form want it create (e.g Create a booking form for our
                  hotel)?
                </li>
                <li>
                  What information you'd like to collet (e.g. email, name,
                  description)?
                </li>
                <li>
                  What tone would you like the questions in (e.g, formal,
                  informal)?
                </li>
                <li>How many questions do you want to ask?</li>
              </ul>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
