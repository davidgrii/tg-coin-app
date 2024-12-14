interface ITitle {
  title: string;
  coins: { min: number; max: number };
  color: string;
  key: 'Beginner' | 'Explorer' | 'Expert' | 'Knight' | 'Leader' | 'Hero' | 'Master' | 'Legend' | 'Titan' | 'Immortal' | 'King' | 'Emperor' | 'Lord' | 'The Almighty'
}

interface INavItems {
  label: string
  href: string
  exact: boolean
  active: boolean
  key: 'market' | 'favorites' | 'pump' | 'trending' | 'dump'
}

export const titles: ITitle[] = [
  { title: 'Beginner', coins: { min: 0, max: 3000 }, color: '#808080', key: 'Beginner' },
  { title: 'Explorer', coins: { min: 3001, max: 6000 }, color: '#90EE90', key: 'Explorer' },
  { title: 'Expert', coins: { min: 6001, max: 10000 }, color: '#f88f07', key: 'Expert' },
  { title: 'Knight', coins: { min: 10001, max: 15000 }, color: '#C0C0C0', key: 'Knight' },
  { title: 'Leader', coins: { min: 15001, max: 25000 }, color: '#FFD700', key: 'Leader' },
  { title: 'Hero', coins: { min: 25001, max: 50000 }, color: '#FF0000', key: 'Hero' },
  { title: 'Master', coins: { min: 50001, max: 100000 }, color: '#800080', key: 'Master' },
  { title: 'Legend', coins: { min: 100001, max: 200000 }, color: '#00c441', key: 'Legend' },
  { title: 'Titan', coins: { min: 200001, max: 500000 }, color: '#f86868', key: 'Titan' },
  { title: 'King', coins: { min: 500001, max: 1000000 }, color: '#4169E1', key: 'King' },
  { title: 'Emperor', coins: { min: 1000001, max: 5000000 }, color: '#B8860B', key: 'Emperor' },
  { title: 'Lord', coins: { min: 5000001, max: 10000000 }, color: '#FFFFFF', key: 'Lord' },
  { title: 'Immortal', coins: { min: 10000001, max: Infinity }, color: '#8A2BE2', key: 'Immortal' },
];


export const CATEGORIES_NAV_ITEMS: INavItems[] = [
  {
    label: 'Market',
    href: '/market',
    exact: false,
    active: true,
    key: 'market'
  },
  {
    label: 'Favorites',
    href: '/favorites',
    exact: false,
    active: true,
    key: 'favorites'
  },
  {
    label: 'Trending',
    href: '/trending',
    exact: false,
    active: true,
    key: 'trending'
  },
  {
    label: 'Pump',
    href: '/pump',
    exact: false,
    active: true,
    key: 'pump'
  },
  {
    label: 'Dump',
    href: '/dump',
    exact: false,
    active: true,
    key: 'dump'
  },
]