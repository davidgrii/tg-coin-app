import React from 'react'
import { Layout } from '@/widgets/main-nav/_ui/layout'
import { Navbar } from '@/widgets/main-nav/_ui/navbar'
import { FavoritesIcon, MarketIcon, PortfolioIcon, SearchIcon } from '@/components/icons'

interface IProps {
  className?: string
}

const NAV_ITEMS = [
  {
    label: 'Market',
    href: '/',
    exact: false,
    icon: <MarketIcon />,
  },
  {
    label: 'Favorites',
    href: '/favorites',
    exact: false,
    icon: <FavoritesIcon />,
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    exact: false,
    icon: <PortfolioIcon />,
  },
  {
    label: 'Search',
    href: '/search',
    exact: false,
    icon: <SearchIcon />,
  },
]

export const MainNav: React.FC<IProps> = ({ className }) => {
  return (
    <Layout nav={<Navbar navItems={NAV_ITEMS}/>} />
  );
};
