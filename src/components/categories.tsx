'use client'

import React from 'react'
import Link from 'next/link'
import { CATEGORIES_NAV_ITEMS } from '../constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/components/ui/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { PortfolioArrowIcon } from '@/components/icons/icons'
import { useTranslation } from 'react-i18next'

interface IProps {
  className?: string
}

export const Categories: React.FC<IProps> = ({ className }) => {

  const { t } = useTranslation()
  const currentPage = usePathname()

  const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  return (
    <div className="overflow-x-auto">
      <ScrollArea className={'select-none'}>
        <div className={cn('flex flex-row gap-1.5 text-sm mb-3 -pb-3 whitespace-nowrap', className)}>
          {CATEGORIES_NAV_ITEMS.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                currentPage === item.href ? 'bg-foreground text-background' : 'bg-background',
                !item.active && 'opacity-45 cursor-not-allowed',
                'flex items-center gap-1.5 px-6 py-2 font-bold rounded-lg border h-10'
              )}
            >
              {t(`CATEGORIES_NAV_ITEMS.${item.key}`)} {item.label === 'Gainers' &&
              <PortfolioArrowIcon width={10} height={10} />}
            </Link>
          ))}
        </div>

         <ScrollBar className={cn(!isMobile && 'h-0')} orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}