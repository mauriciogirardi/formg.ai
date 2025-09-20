import './globals.css'

import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import { Providers } from '@/providers'

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Formg.ai - AI Powered Form Builder',
    template: '%s | Formg.ai',
  },
  description:
    'Create beautiful forms powered by AI. Build and share forms in seconds with Formg.ai – the easiest AI-powered form builder.',
  keywords: [
    'form builder',
    'ai forms',
    'ai form builder',
    'form generator',
    'create forms online',
    'formg.ai',
  ],
  metadataBase: new URL('https://formg-ai.vercel.app/'),
  openGraph: {
    title: 'Formg.ai - AI Powered Form Builder',
    description:
      'Build forms in seconds with the power of AI. Share anywhere, customize easily, and save time with Formg.ai.',
    url: 'https://formg-ai.vercel.app/',
    siteName: 'Formg.ai',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Formg.ai - AI Powered Form Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Formg.ai - AI Powered Form Builder',
    description:
      'Create forms in seconds with AI. Share anywhere, customize easily, and save time.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://formg-ai.vercel.app/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-white antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
