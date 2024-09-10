import React from 'react'

import { FavoritesIcon, MarketIcon, PortfolioIcon } from '@/components/icons'
import { Layout } from '@/widgets/main-nav/_ui/layout'
import { Navbar } from '@/widgets/main-nav/_ui/navbar'

interface IProps {
  className?: string
}

const NAV_ITEMS = [
  {
    label: 'Market',
    href: '/market',
    exact: false,
    icon: <MarketIcon />
  },
  {
    label: 'Favorites',
    href: '/favorites',
    exact: false,
    icon: <FavoritesIcon />
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    exact: false,
    icon: <PortfolioIcon />
  }
]

export const NavMenu: React.FC<IProps> = ({ className }) => {
  return (
    <Layout nav={<Navbar navItems={NAV_ITEMS} />} />
  )
}
