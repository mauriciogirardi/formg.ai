import { cn } from '@/lib/utils'
import Link from 'next/link'

type LinkNavProps = {
  url: string
  label: string
  activeLink?: boolean
  disabled?: boolean
}

export function LinkNav({
  label,
  url,
  activeLink = false,
  disabled = false,
}: LinkNavProps) {
  return (
    <li className="relative h-full">
      <Link
        href={url}
        className={cn(
          'text-white/90 text-base font-norma z-50 flex items-center justify-center px-3 h-full transition-colors hover:text-white/70 focus-within:outline-none',
          disabled && 'opacity-60 pointer-events-none',
          activeLink && 'pointer-events-none'
        )}
      >
        {label}
      </Link>
      {activeLink && (
        <div className="absolute shadow-sm shadow-slate-50/10 top-0 left-0 right-0 h-[52px] bg-primary transition-colors ease-in-out rounded-b-xl -z-[1]" />
      )}
    </li>
  )
}
