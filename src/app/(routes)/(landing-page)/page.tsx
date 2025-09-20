'use client'

import { Button } from '@/components/ui/button'
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { ExternalLink, InfoIcon } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LandingPage() {
  return (
    <main className="w-full h-auto bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] text-white relative overflow-hidden pb-16 -mt-[60px]">
      {/* Animated background shapes */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl"
        animate={{ x: [0, 50, -50, 0], y: [0, -40, 40, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 18,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-40 -right-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        animate={{ x: [0, -40, 40, 0], y: [0, 30, -30, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 22,
          ease: 'easeInOut',
        }}
      />

      {/* Demo Badge */}
      <div className="flex items-center justify-center mt-24 z-10 relative">
        <span className="flex items-center gap-2 rounded-full border border-violet-500/30 bg-white/10 text-sm font-semibold px-4 py-1 backdrop-blur-sm shadow-lg text-violet-200 animate-pulse">
          <InfoIcon className="w-4 h-4 text-violet-400" aria-hidden="true" />
          Demo Version
        </span>
      </div>

      {/* Hero Section */}
      <section
        className="w-full flex flex-col items-center justify-center py-20 px-4 z-10 relative"
        aria-labelledby="hero-title"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl w-full text-center bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-10"
        >
          <h1
            id="hero-title"
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 bg-clip-text text-transparent animate-sparkle">
              AI Powered
            </span>{' '}
            Form Builder
          </h1>
          <p className="text-md md:text-lg mt-4 text-white/80">
            Create beautiful forms and share them anywhere. It takes seconds
            with our AI-powered builder.
          </p>

          <motion.div
            className="mt-6 flex justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              className="h-12 text-base font-medium min-w-32 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-xl"
              asChild
            >
              <RegisterLink>
                Get Started
                <ExternalLink className="ml-2 w-4 h-4" aria-hidden="true" />
              </RegisterLink>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Hero Image */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="w-full relative max-w-5xl mx-auto px-4 md:px-6 lg:px-8 z-10"
        aria-label="Product Preview"
      >
        <div className="w-full h-[260px] md:h-[500px] lg:h-[580px] rounded-2xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-sm bg-white/5">
          <div className="relative w-full h-full">
            <Image
              src="/images/hero.png"
              alt="Preview of Formg AI dashboard interface"
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
      </motion.section>

      {/* Key Features Section */}
      <section
        className="w-full py-24 px-4 md:px-10 lg:px-20 text-center z-10 relative"
        aria-labelledby="features-title"
      >
        <h2
          id="features-title"
          className="text-3xl md:text-4xl font-bold mb-10 text-white"
        >
          Why choose <span className="text-violet-400">Formg AI Builder?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: '🤖 AI Suggestions',
              desc: 'Let AI help you build smarter, contextual forms in seconds.',
            },
            {
              title: '🧩 Drag & Drop',
              desc: 'Easily drag and rearrange components with a fluid UI.',
            },
            {
              title: '📊 Analytics Ready',
              desc: 'Get instant insights from responses and form usage.',
            },
          ].map(({ title, desc }, i) => (
            <motion.article
              key={String(i)}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-6 shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-violet-300">
                {title}
              </h3>
              <p className="text-white/80 text-sm">{desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* GitHub Call-to-Action */}
      <footer className="text-center mt-12 px-6">
        <p className="text-white/70 text-lg">
          ⭐ If you find this project helpful, please consider starring it on{' '}
          <a
            href="https://github.com/mauriciogirardi/formg.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-violet-400 hover:text-violet-300"
          >
            GitHub
          </a>
          .
        </p>
      </footer>
    </main>
  )
}
