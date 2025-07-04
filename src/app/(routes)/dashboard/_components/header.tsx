import { Logo } from '@/components/logo'

import { Menus } from './menus'
import { Profile } from './profile'

export function Header() {
  return (
    <header className="sticky top-0 z-50 gap-4 bg-[#43217c]">
      <div className="w-full h-16 px-4 flex xl:px-11 items-center ">
        <nav className="gap-6 h-full text-lg font-medium flex flex-row">
          <div className="flex items-center mr-5 pr-8 border-r border-gray-600">
            <Logo url="/dashboard" />
            <span className="sr-only">Formg</span>
          </div>
          <Menus />
        </nav>
        <Profile />
      </div>
    </header>
  )
}
