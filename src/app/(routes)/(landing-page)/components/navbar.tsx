'use client'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'

export function Navbar() {
  return (
    <div className="shadow-sm w-full sticky top-0 !bg-[#43217c]  dark:bg-gray-900 z-[9999]">
      <div className="w-full mx-auto max-w-7xl p-3 px-5 flex items-center justify-between ">
        <div className="flex items-center flex-1 gap-9">
          <div>
            <Logo url="/" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LoginLink>
            <Button variant="outline" className="bg-transparent text-white">
              Sign In
            </Button>
          </LoginLink>
          <RegisterLink>
            <Button>Get Started</Button>
          </RegisterLink>
        </div>
      </div>
    </div>
  )
}
