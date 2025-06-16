'use client'

import { Button } from '@/components/ui/button'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { ExternalLink, InfoIcon } from 'lucide-react'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="w-full h-auto bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] text-white relative overflow-hidden pb-12 -mt-[60px]">
      {/* Glow effect background */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-700/10 via-violet-500/20 to-transparent blur-3xl pointer-events-none z-0" />

      {/* Demo Badge */}
      <div className="flex items-center justify-center mt-24 z-10 relative">
        <div className="flex items-center gap-2 rounded-full border border-violet-500/30 bg-white/10 text-sm font-semibold px-4 py-1 backdrop-blur-sm shadow-lg text-violet-200 animate-pulse">
          <InfoIcon className="w-4 h-4 text-violet-400" />
          Demo Version
        </div>
      </div>

      {/* Main content */}
      <div className="w-full flex flex-col items-center justify-center py-16 px-4 z-10 relative">
        <div className="max-w-4xl w-full text-center bg-white/5 border border-white/10 rounded-xl shadow-2xl backdrop-blur-md p-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 bg-clip-text text-transparent animate-sparkle">
              AI Powered
            </span>{' '}
            Formg Builder
          </h1>
          <p className="text-md md:text-lg mt-4 text-white/80">
            Create beautiful forms and share them anywhere. It takes seconds
            with our AI-powered builder.
          </p>

          <div className="mt-6 flex justify-center">
            <Button
              className="h-12 text-base font-medium min-w-32 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-xl"
              asChild
            >
              <RegisterLink>
                Get Started
                <ExternalLink className="ml-2 w-4 h-4" />
              </RegisterLink>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full relative max-w-5xl mx-auto px-4 md:px-6 lg:px-8 z-10">
        <div className="w-full h-[260px] md:h-[500px] lg:h-[580px] rounded-xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-sm bg-white/5">
          <div className="relative w-full h-full">
            <Image
              src="/images/hero.png"
              alt="Formg AI dashboard"
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
