'use client'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'

export function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-md">
      <div className="w-full mx-auto max-w-7xl px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo url="/" />
        </div>
        <div className="flex items-center gap-4">
          <LoginLink>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 transition"
            >
              Sign In
            </Button>
          </LoginLink>
          <RegisterLink>
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md">
              Get Started
            </Button>
          </RegisterLink>
        </div>
      </div>
    </header>
  )
}
