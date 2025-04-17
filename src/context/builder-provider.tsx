'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
  type ReactNode,
  useContext,
} from 'react'
import { useParams } from 'next/navigation'

import type {
  FormBlockInstance,
  FormWithSettings,
  PositionLayout,
} from '@/@types'
import { generateUniqueId } from '@/lib/helpers'

type RepositionBlockLayout = {
  position: PositionLayout
  activeId: string
  overId: string
}

type InsertBlockLayout = {
  position: PositionLayout
  newBlockLayout: FormBlockInstance
  overId: string
}

type UpdateChildBlock = {
  parentId: string
  childBlockId: string
  updatedBlock: FormBlockInstance
}

type UpdateBlockLayout = {
  id: string
  childrenBlocks: FormBlockInstance[]
}

type FormData = FormWithSettings | null
type BuilderContextType = {
  loading: boolean
  formData: FormData
  setFormData: Dispatch<SetStateAction<FormData | null>>
  blockLayouts: FormBlockInstance[]
  setBlockLayouts: Dispatch<SetStateAction<FormBlockInstance[]>>
  selectedBlockLayout: FormBlockInstance | null
  onAddBlockLayout: (blockLayout: FormBlockInstance) => void
  onRemoveBlockLayout: (id: string) => void
  onDuplicateBlockLayout: (id: string) => void
  onSelectedLayout: (blockLayout: FormBlockInstance | null) => void
  onRepositionBlockLayout: (data: RepositionBlockLayout) => void
  onInsertBlockLayoutAtIndex: (data: InsertBlockLayout) => void
  onUpdateChildBlock: (data: UpdateChildBlock) => void
  onUpdateBlockLayout: (data: UpdateBlockLayout) => void
}

const BuilderContext = createContext<BuilderContextType | null>(null)

export function BuilderProvider({ children }: { children: ReactNode }) {
  const params = useParams()
  const formId = params.formId as string

  const [formData, setFormData] = useState<FormData>(null)
  const [blockLayouts, setBlockLayouts] = useState<FormBlockInstance[]>([])
  const [loading, setLoading] = useState(false)

  const [selectedBlockLayout, setSelectedBlockLayout] =
    useState<FormBlockInstance | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (!formId) return

        const response = await fetch(`/api/fetch-form-by-id?formId=${formId}`, {
          method: 'GET',
          next: { tags: ['fetchFormById'] },
        })

        if (!response.ok) throw new Error('Failed to fetch formId.')

        const { data } = await response.json()

        if (data?.form) {
          setFormData(data.form)

          if (data.form?.jsonBlocks) {
            const parsedBlocks = JSON.parse(data.form.jsonBlocks)
            setBlockLayouts(parsedBlocks)
          }
        }
      } catch (error) {
        console.error('Error fetching form:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [formId])

  const onAddBlockLayout = (blockLayout: FormBlockInstance) => {
    setBlockLayouts(prev => {
      const updatedBlocks = [...prev]
      updatedBlocks.push(blockLayout)
      return updatedBlocks
    })
  }

  const onDuplicateBlockLayout = (id: string) => {
    setBlockLayouts(prev => {
      const blockToDuplicate = prev.find(block => block.id === id)
      if (!blockToDuplicate) return prev

      const duplicatedBlock: FormBlockInstance = {
        ...blockToDuplicate,
        id: `layout-${generateUniqueId()}`,
        childBlocks: blockToDuplicate?.childBlocks?.map(block => ({
          ...block,
          id: generateUniqueId(),
        })),
      }

      const updatedBlocLayouts = [...prev]
      const insertIndex = prev.findIndex(block => block.id === id) + 1
      updatedBlocLayouts.splice(insertIndex, 0, duplicatedBlock)

      return updatedBlocLayouts
    })
  }

  const onRemoveBlockLayout = (id: string) => {
    setBlockLayouts(prev => prev.filter(block => block.id !== id))
    if (selectedBlockLayout?.id === id) setSelectedBlockLayout(null)
  }

  const onSelectedLayout = (blockLayout: FormBlockInstance | null) => {
    setSelectedBlockLayout(blockLayout)
  }

  const onRepositionBlockLayout = ({
    activeId,
    overId,
    position,
  }: RepositionBlockLayout) => {
    setBlockLayouts(prev => {
      const activeIndex = prev.findIndex(block => block.id === activeId)
      const overIndex = prev.findIndex(block => block.id === overId)

      if (activeIndex === -1 || overIndex === -1) {
        console.warn('Active or Over block not fount!')
        return prev
      }

      const updatedBlocks = [...prev]
      const [movedBlock] = updatedBlocks.splice(activeIndex, 1)
      const insertIndex = position === 'above' ? overIndex : overIndex + 1

      updatedBlocks.splice(insertIndex, 0, movedBlock)

      return updatedBlocks
    })
  }

  const onInsertBlockLayoutAtIndex = ({
    newBlockLayout,
    overId,
    position,
  }: InsertBlockLayout) => {
    setBlockLayouts(prev => {
      const overIndex = prev.findIndex(block => block.id === overId)
      if (overIndex === -1) {
        return prev
      }

      const insertIndex = position === 'above' ? overIndex : overIndex + 1
      const updatedBlocks = [...prev]
      updatedBlocks.splice(insertIndex, 0, newBlockLayout)
      return updatedBlocks
    })
  }

  const onUpdateBlockLayout = ({ childrenBlocks, id }: UpdateBlockLayout) => {
    setBlockLayouts(prev =>
      prev.map(block =>
        block.id === id
          ? {
              ...block,
              childBlocks: childrenBlocks,
            }
          : block
      )
    )
  }

  const onUpdateChildBlock = ({
    childBlockId,
    parentId,
    updatedBlock,
  }: UpdateChildBlock) => {
    setBlockLayouts(prevBlocks => {
      const updatedBlocks = prevBlocks.map(parentBlock => {
        if (parentBlock.id === parentId) {
          const updatedChildBlocks = parentBlock.childBlocks?.map(childBlock =>
            childBlock.id === childBlockId
              ? { ...childBlock, ...updatedBlock }
              : childBlock
          )
          return { ...parentBlock, childBlocks: updatedChildBlocks }
        }

        return parentBlock
      })

      return updatedBlocks
    })
  }

  return (
    <BuilderContext.Provider
      value={{
        loading,
        formData,
        blockLayouts,
        setBlockLayouts,
        setFormData,
        selectedBlockLayout,
        onSelectedLayout,
        onAddBlockLayout,
        onRemoveBlockLayout,
        onDuplicateBlockLayout,
        onRepositionBlockLayout,
        onInsertBlockLayoutAtIndex,
        onUpdateChildBlock,
        onUpdateBlockLayout,
      }}
    >
      {children}
    </BuilderContext.Provider>
  )
}

export function useBuilder() {
  const context = useContext(BuilderContext)
  if (!context) throw new Error('Use Context inside the provider.')
  return context
}
