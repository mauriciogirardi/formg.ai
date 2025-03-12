'use client'

import { useParams, usePathname } from 'next/navigation'

import { LinkNav } from './link-nav'

export function Menus() {
  const pathname = usePathname()
  const { formId } = useParams()

  const NAV_MENUS = [
    { label: 'Dashboard', pathname: '/dashboard', isDisabled: false },
    {
      label: 'Builder',
      pathname: `/dashboard/form/builder/${formId}`,
      isDisabled: true,
    },
    {
      label: 'Responds',
      pathname: `/dashboard/form/response/${formId}`,
      isDisabled: true,
    },
    { label: 'Settings', pathname: '/settings', isDisabled: false },
  ]

  return (
    <ul className="hidden md:flex">
      {NAV_MENUS.map(menu => (
        <LinkNav
          key={menu.pathname}
          label={menu.label}
          url={menu.pathname}
          activeLink={menu.pathname === pathname}
          disabled={menu.isDisabled}
        />
      ))}
    </ul>
  )
}
