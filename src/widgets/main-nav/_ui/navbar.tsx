'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/components/ui/utils'
import { usePathname } from 'next/navigation'
import { FavoritesIcon, MarketIcon, PortfolioIcon } from '@/components/icons'
import { useTranslation } from 'react-i18next'

interface IProps {
  className?: string
}

export const Navbar: React.FC<IProps> = ({ className }) => {
  const currentPage = usePathname()
  const { t } = useTranslation()
  
  return (
    <nav>
      <ul className={'grid grid-cols-3 gap-12 text-nowrap'}>
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
        {/*<li>*/}
        {/*  <Link*/}
        {/*    href={'/profile'}*/}
        {/*    className={cn(currentPage === '/profile' ? 'text-foreground' : 'text-muted-foreground',*/}
        {/*      'flex flex-col items-center gap-1 font-semibold transition hover:text-foreground')}*/}
        {/*  >*/}
        {/*    <PortfolioIcon />*/}
        {/*    <span className={'text-xs'}>{t('profile')}</span>*/}
        {/*  </Link>*/}
        {/*</li>*/}
      </ul>
    </nav>
  )
}
