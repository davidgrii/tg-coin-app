'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/components/ui/utils'
import { usePathname, useRouter } from 'next/navigation'
import { FavoritesIcon, MarketIcon, PortfolioIcon, SearchIcon } from '@/components/icons'
import { useSearchStore } from '@/store'
import { useTranslation } from 'react-i18next'

interface IProps {
  className?: string
}

export const Navbar: React.FC<IProps> = ({ navItems, className }) => {
  const { isSearchOpen, toggleSearch, closeSearch } = useSearchStore()
  const router = useRouter()
  const currentPage = usePathname()
  const { t } = useTranslation()

  const handleSearchClick = () => {
    router.push('/')
    setTimeout(() => {
      toggleSearch(true)
    }, 500)
  }

  useEffect(() => {
    closeSearch()
  }, [currentPage, closeSearch])

  return (
    <nav>
      <ul className={'grid grid-cols-4 gap-8'}>
        <li>
          <Link
            href={'/market'}
            className={cn(currentPage === '/market' ? 'text-foreground' : 'text-muted-foreground',
              'flex flex-col items-center gap-1 font-semibold transition hover:text-foreground')}
          >
            <MarketIcon />
            <span className={'text-xs'}>{t('market')}</span>
          </Link>
        </li>
        <li>
          <Link
            href={'/favorites'}
            className={cn(currentPage === '/favorites' ? 'text-foreground' : 'text-muted-foreground',
              'flex flex-col items-center gap-1 font-semibold transition hover:text-foreground')}
          >
            <FavoritesIcon />
            <span className={'text-xs'}>{t('favorites')}</span>
          </Link>
        </li>
        <li>
          <Link
            href={'/portfolio'}
            className={cn(currentPage === '/portfolio' ? 'text-foreground' : 'text-muted-foreground',
              'flex flex-col items-center gap-1 font-semibold transition hover:text-foreground')}
          >
            <PortfolioIcon />
            <span className={'text-xs'}>{t('portfolio')}</span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleSearchClick}
            className={cn(isSearchOpen ? 'text-foreground' : 'text-muted-foreground',
              'flex flex-col items-center gap-1 font-semibold transition hover:text-foreground')}
          >
            <SearchIcon />
            <span className={'text-xs'}>{t('search')}</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}
