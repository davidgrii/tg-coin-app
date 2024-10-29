import React from 'react'
import Link from 'next/link'
import { CATEGORIES_NAV_ITEMS } from '@/utils/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/components/ui/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PortfolioArrowIcon } from '@/components/icons/icons'

interface IProps {
  className?: string
}

export const Categories: React.FC<IProps> = ({ className }) => {

  const currentPage = usePathname()

  return (
    <ScrollArea>
      <div className={cn('flex flex-row gap-1.5 text-sm mb-2 whitespace-nowrap', className)}>
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
            {item.label} {item.label === 'Gainers' && <PortfolioArrowIcon width={10} height={10}/>}
          </Link>
        ))}
      </div>

      {/*<ScrollBar orientation="horizontal" />*/}
    </ScrollArea>
  )
}