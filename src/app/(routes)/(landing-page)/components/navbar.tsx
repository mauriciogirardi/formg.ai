'use client'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Navbar() {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY < 50) return setShow(true)
      if (window.scrollY > lastScrollY) {
        setShow(false)
      } else {
        setShow(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', controlHeader)
    return () => window.removeEventListener('scroll', controlHeader)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {show && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10 shadow-md"
        >
          <div className="w-full mx-auto max-w-7xl px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Logo url="/" />
            </div>
            <div className="flex items-center gap-4">
              <LoginLink>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 hover:text-white transition"
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
        </motion.header>
      )}
    </AnimatePresence>
  )
}
