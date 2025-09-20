import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { Navbar } from './components/navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Formg.ai - AI Powered Form Builder',
  description:
    'Create beautiful forms powered by AI. Build and share forms in seconds with Formg.ai – the easiest AI-powered form builder.',
  alternates: {
    canonical: 'https://formg-ai.vercel.app/',
  },
  openGraph: {
    title: 'Formg.ai - AI Powered Form Builder',
    description:
      'Build smarter forms in seconds with the power of AI. Share anywhere, customize easily, and save time with Formg.ai.',
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
    images: ['/images/hero.png'],
  },
}

export default async function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isAuthenticated } = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()

  if (isUserAuthenticated) {
    redirect('/dashboard')
  }

  return (
    <div className="w-full min-h-screen">
      <Navbar />
      {children}
    </div>
  )
}
