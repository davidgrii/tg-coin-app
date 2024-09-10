'use client'

import { INavItem } from '@/types'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/components/ui/utils'
import { usePathname } from 'next/navigation'
import { SearchIcon } from '@/components/icons'
import { useSearchStore } from '@/store'

interface IProps {
  navItems: INavItem[]
  className?: string
}

export const Navbar: React.FC<IProps> = ({ navItems, className }) => {

  const { isSearchOpen, toggleSearch } = useSearchStore()

  const currentPage = usePathname()

  return (
    <nav>
      <ul className={'grid grid-cols-4 gap-8'}>
        {navItems.map(({ href, label, exact, icon }) => (
          <li key={label}>
            <Link
              href={href}
              className={cn(currentPage === href ||
                (exact && currentPage.startsWith(href))
                  ? 'text-foreground'
                  : 'text-muted-foreground',
                'flex flex-col items-center gap-1 font-semibold transition hover:text-foreground'
              )}
            >
              {icon}
              <span className={'text-xs'}>
                {label}
              </span>
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={() => toggleSearch(!isSearchOpen)}
            className={cn(isSearchOpen ? 'text-foreground' :'text-muted-foreground',
              'flex flex-col items-center gap-1 font-semibold transition hover:text-foreground'
            )}
          >
            <SearchIcon />
            <span className={'text-xs'}>
                Search
              </span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
