'use client'

import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { ChevronDown, LogOutIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

export function Profile() {
  const { user, isLoading } = useKindeBrowserClient()

  return (
    <div className="flex items-center gap-1 justify-end w-full">
      {isLoading && (
        <div className="flex items-start gap-2">
          <Skeleton className="rounded-full w-8 h-8" />
          <div className="lg:placeholder:flex items-center gap-2 hidden">
            <div className="flex-1 text-left space-y-2">
              <Skeleton className="h-3 w-[100px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
        </div>
      )}

      {!isLoading && (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:ring-2 focus-visible:rounded-sm focus-visible:ring-ring focus-within:outline-none">
            <div className="flex items-start gap-2">
              <Avatar className="size-10 bg-gray-200 shrink-0 rounded-full">
                <AvatarImage
                  src={user?.picture || ''}
                  alt={user?.given_name || ''}
                />
                <AvatarFallback className="rounded-full">
                  {user?.given_name?.charAt(0)}
                  {user?.family_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="lg:flex items-center gap-2 hidden">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-gray-200">
                    {user?.given_name} {user?.family_name}
                  </span>
                  <span
                    className="truncate text-muted text-xs block w-full max-w-[150px]"
                    title={user?.email ?? ''}
                  >
                    {user?.email}
                  </span>
                </div>

                <ChevronDown className="ml-auto size-4 text-white/80" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <LogoutLink className="flex items-center gap-x-2">
                <LogOutIcon className="size-4" />
                Logout
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
