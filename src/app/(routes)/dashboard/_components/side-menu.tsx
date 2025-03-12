'use client'

import { cn } from '@/lib/utils'
import { Blocks, type LucideIcon, MessageSquare } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'

type NavType = {
  title: string
  url: string
  icon: LucideIcon
}

export function SideMenu() {
  const { formId } = useParams()
  const router = useRouter()
  const pathname = usePathname()

  const navMenu: NavType[] = [
    {
      title: 'Builder',
      url: `/dashboard/form/builder/${formId}`,
      icon: Blocks,
    },
    {
      title: 'Responses',
      url: `/dashboard/form/responses/${formId}`,
      icon: MessageSquare,
    },
  ]

  return (
    <div className="fixed h-screen z-40 -ml-1 -mt-1 -mb-1 pt-5 border-r shadow-sm bg-black text-white">
      <ul className="flex items-center flex-col p-2">
        {navMenu.map(({ icon: Icon, title, url }) => (
          <li key={title} className="pb-2">
            <button
              type="button"
              className={cn(
                'outline-none transition-colors ease-in-out p-2 hover:bg-white hover:text-black rounded-md',
                url === pathname && 'bg-white text-black pointer-events-none'
              )}
            >
              <Icon className="size-[18px]" />
              <span className="sr-only">{title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
