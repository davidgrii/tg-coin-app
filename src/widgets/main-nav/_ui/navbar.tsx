'use client'

import { INavItem } from '@/types'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/components/ui/utils'
import { usePathname } from 'next/navigation'

interface IProps {
  navItems: INavItem[]
  className?: string
}

export const Navbar: React.FC<IProps> = ({ navItems, className }) => {

  const currentPage = usePathname()

  return (
    <nav className={cn(className, '')}>
      <ul className={'flex justify-center gap-9'}>
        {navItems.map(({ href, label, exact, icon}) => (
          <li key={label}>
            <Link
              href={href}
              className={cn(currentPage === href || (exact && currentPage.startsWith(href))
                  ? 'text-foreground'
                  : 'text-muted-foreground',
                'flex flex-col items-center gap-1 text-sm'
              )}
            >
              {icon}
              <div>
                {label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
