import { FIcon } from '@/icons/f-icon'
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
        <FIcon />

        <h5
          className={cn(
            'font-bold text-xl tracking-[-0.07em] hidden md:block',
            color
          )}
        >
          Formg.ai
        </h5>
      </Link>
    </div>
  )
}
