import type { FormBlockInstance, PositionLayout } from '@/@types'
import { generateUniqueId } from '@/lib/helpers'
import { produce } from 'immer'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

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

type Action =
  | string
  | {
      type: string
      [x: string | number | symbol]: unknown
    }

export type StoreSet = {
  (
    partial:
      | Store
      | Partial<Store>
      | ((state: Store) => Store | Partial<Store>),
    replace?: false | undefined,
    action?: Action | undefined
  ): void
  (
    state: Store | ((state: Store) => Store),
    replace: true,
    action?: Action | undefined
  ): void
}

interface State {
  loading: boolean
  formData: FormData | null
  blockLayouts: FormBlockInstance[]
  selectedBlockLayout: FormBlockInstance | null
}

const initialState: State = {
  blockLayouts: [],
  loading: false,
  formData: null,
  selectedBlockLayout: null,
}

interface Mutations {
  setFormData: (formData: FormData | null) => void
  setBlockLayouts: (blockLayouts: FormBlockInstance[]) => void
  onAddBlockLayout: (blockLayout: FormBlockInstance) => void
  onRemoveBlockLayout: (id: string) => void
  onDuplicateBlockLayout: (id: string) => void
  onSelectedLayout: (blockLayout: FormBlockInstance | null) => void
  onRepositionBlockLayout: (data: RepositionBlockLayout) => void
  onInsertBlockLayoutAtIndex: (data: InsertBlockLayout) => void
  onUpdateChildBlock: (data: UpdateChildBlock) => void
  onUpdateBlockLayout: (data: UpdateBlockLayout) => void
  fetchFormById: (formId: string) => void
}

function actions(set: StoreSet, get: () => State): Mutations {
  function fetchFormById(formId: string) {
    set(
      produce((state: State) => {
        state.loading = true
      })
    )

    if (!formId) return

    fetch(`/api/fetch-form-by-id?formId=${formId}`, {
      method: 'GET',
      next: { tags: ['fetchFormById'] },
    })
      .then(async res => {
        if (!res.ok) throw new Error('Failed to fetch formId.')
        return res.json()
      })
      .then(res => {
        const { data } = res
        if (data?.form) {
          set(
            produce((state: State) => {
              state.formData = data.form

              if (data.form?.jsonBlocks) {
                try {
                  const parsedBlocks = JSON.parse(data.form.jsonBlocks)
                  state.blockLayouts = parsedBlocks
                } catch (e) {
                  console.error('Erro ao fazer parse dos blocos:', e)
                }
              }
            })
          )
        }
      })
      .catch(err => {
        console.error('Error fetching form:', err)
      })
      .finally(() => {
        set(
          produce((state: State) => {
            state.loading = false
          })
        )
      })
  }

  function setFormData(formData: FormData | null) {
    set(
      produce((state: State) => {
        state.formData = formData
      })
    )
  }

  function setBlockLayouts(blockLayouts: FormBlockInstance[]) {
    set(
      produce((state: State) => {
        state.blockLayouts = blockLayouts
      })
    )
  }

  function onAddBlockLayout(block: FormBlockInstance) {
    set(state => ({
      blockLayouts: [...state.blockLayouts, block],
    }))
  }

  function onRemoveBlockLayout(id: string) {
    const { blockLayouts, selectedBlockLayout } = get()
    const updatedBlockLayouts = blockLayouts.filter(block => block.id !== id)

    set({
      blockLayouts: updatedBlockLayouts,
      selectedBlockLayout:
        selectedBlockLayout?.id === id ? null : selectedBlockLayout,
    })
  }

  function onDuplicateBlockLayout(id: string) {
    const { blockLayouts } = get()

    const blockToDuplicate = blockLayouts.find(block => block.id === id)
    if (!blockToDuplicate) return

    const duplicatedBlock: FormBlockInstance = {
      ...blockToDuplicate,
      id: `layout-${generateUniqueId()}`,
      childBlocks: blockToDuplicate.childBlocks?.map(child => ({
        ...child,
        id: generateUniqueId(),
      })),
    }

    const insertIndex = blockLayouts.findIndex(block => block.id === id) + 1
    const updatedBlockLayouts = [...blockLayouts]
    updatedBlockLayouts.splice(insertIndex, 0, duplicatedBlock)

    set({ blockLayouts: updatedBlockLayouts })
  }

  function onSelectedLayout(blockLayout: FormBlockInstance | null) {
    set(() => ({
      selectedBlockLayout: blockLayout,
    }))
  }

  function onRepositionBlockLayout({
    activeId,
    overId,
    position,
  }: RepositionBlockLayout) {
    const { blockLayouts } = get()

    const activeIndex = blockLayouts.findIndex(block => block.id === activeId)
    const overIndex = blockLayouts.findIndex(block => block.id === overId)

    if (activeIndex === -1 || overIndex === -1) {
      console.warn('Active or Over block not found!')
      return
    }

    const updatedBlocks = [...blockLayouts]
    const [movedBlock] = updatedBlocks.splice(activeIndex, 1)

    const insertIndex =
      activeIndex < overIndex
        ? position === 'above'
          ? overIndex - 1
          : overIndex
        : position === 'above'
          ? overIndex
          : overIndex + 1

    updatedBlocks.splice(insertIndex, 0, movedBlock)

    set({ blockLayouts: updatedBlocks })
  }

  function onInsertBlockLayoutAtIndex({
    newBlockLayout,
    overId,
    position,
  }: InsertBlockLayout) {
    const { blockLayouts } = get()

    const overIndex = blockLayouts.findIndex(block => block.id === overId)
    if (overIndex === -1) return

    const insertIndex = position === 'above' ? overIndex : overIndex + 1

    const updatedBlocks = [...blockLayouts]
    updatedBlocks.splice(insertIndex, 0, newBlockLayout)

    set({ blockLayouts: updatedBlocks })
  }

  function onUpdateChildBlock({
    childBlockId,
    parentId,
    updatedBlock,
  }: UpdateChildBlock) {
    const { blockLayouts } = get()

    const updatedBlocks = blockLayouts.map(parentBlock => {
      if (parentBlock.id === parentId) {
        const updatedChildBlocks = parentBlock.childBlocks?.map(child =>
          child.id === childBlockId ? { ...child, ...updatedBlock } : child
        )

        return {
          ...parentBlock,
          childBlocks: updatedChildBlocks,
        }
      }

      return parentBlock
    })

    set({ blockLayouts: updatedBlocks })
  }

  function onUpdateBlockLayout({ childrenBlocks, id }: UpdateBlockLayout) {
    const { blockLayouts } = get()

    const updatedBlocks = blockLayouts.map(block =>
      block.id === id
        ? {
            ...block,
            childBlocks: childrenBlocks,
          }
        : block
    )

    set({ blockLayouts: updatedBlocks })
  }

  return {
    onAddBlockLayout,
    onDuplicateBlockLayout,
    onInsertBlockLayoutAtIndex,
    onRemoveBlockLayout,
    onRepositionBlockLayout,
    onSelectedLayout,
    onUpdateBlockLayout,
    onUpdateChildBlock,
    setBlockLayouts,
    setFormData,
    fetchFormById,
  }
}

interface Store extends Mutations, State {}

export const useBuilderStore = create<Store>()(
  devtools(
    (set, get) => ({
      ...initialState,
      ...actions(set, get),
    }),
    {
      name: 'builder-form',
      enabled: process.env.DEBUG_STORES === 'true',
    }
  )
)

export const getBuilderStore = () => useBuilderStore.getState()
