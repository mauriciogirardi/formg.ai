import { cn } from '@/lib/utils'
import Link from 'next/link'

type LogoProps = {
  url?: string
  color?: string
}

export function Logo({ url = '/', color = 'text-white' }: LogoProps) {
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link
        href={url}
        className="flex items-center gap-2 focus-visible:ring-2 focus-visible:rounded-sm focus-visible:ring-ring focus-within:outline-none"
      >
        <div
          style={{ fontSize: '19px' }}
          className="font-bold italic !font-mono size-8 text-gray-50 rounded-lg flex items-center border-2 justify-center bg-gradient-to-br from-purple-500 to-primary to-90% dark:border-gray-200"
        >
          F
        </div>
        <h5 className={cn('font-bold text-xl tracking-[-0.07em]', color)}>
          Formg.ai
        </h5>
      </Link>
    </div>
  )
}
