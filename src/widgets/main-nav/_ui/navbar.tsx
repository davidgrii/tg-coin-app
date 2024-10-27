'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/components/ui/utils'
import { usePathname } from 'next/navigation'
import { FavoritesIcon, MarketIcon, PortfolioIcon } from '@/components/icons'
import { useTranslation } from 'react-i18next'
import { Gift } from 'lucide-react'
import { FriendsIcon } from '@/components/icons/icons'

interface IProps {
  className?: string
}

export const Navbar: React.FC<IProps> = ({ className }) => {

  const [show, setShow] = useState(false)
  const currentPage = usePathname()
  const { t } = useTranslation()

  useEffect(() => {
    const giftShown = localStorage.getItem('giftShown')

    if (!giftShown && currentPage !== '/friends') {
      setShow(true)
    }

    if (currentPage === '/friends' && !giftShown) {
      localStorage.setItem('giftShown', 'true')
    }
  }, [currentPage])

  return (
    <nav>
      <ul className={'grid grid-cols-4 gap-10 text-nowrap'}>
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
            prefetch
            className={cn(currentPage === '/portfolio' ? 'text-foreground' : 'text-muted-foreground',
              'flex flex-col items-center gap-1 font-semibold transition hover:text-foreground')}
          >
            <PortfolioIcon />
            <span className={'text-xs'}>{t('portfolio')}</span>
          </Link>
        </li>
        <li className={'relative'}>
          {show &&
            <div className={'absolute animate-bounce bg-background/10 backdrop-blur-sm rounded-full p-1 -left-2.5 -top-6 text-sm flex items-center gap-0.5'}>
              +3000 <Gift width={14} height={14} />
              <div className="relative -top-2 flex h-1.5 w-1.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#007BFF]"></span>
              </div>
            </div>
          }
          <Link
            href={'/friends'}
            className={cn(currentPage === '/friends' ? 'text-foreground' : 'text-muted-foreground',
              'flex flex-col items-center gap-1 font-semibold transition hover:text-foreground')}
          >
            <FriendsIcon />
            <span className={'text-xs'}>{t('friends')}</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
