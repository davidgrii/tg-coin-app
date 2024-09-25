import React from 'react'
import { CardContent } from '@/components/ui/card'
import { StarFavoriteIcon, StarIcon } from '@/components/icons'
import { ICrypto } from '@/types'
import { formatPrice, getDynamicFontSize } from '@/components/utils/utils'
import Image from 'next/image'

interface IProps {
  index: number
  crypto: ICrypto
  favorites: string[]
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  className?: string
}

export const CryptoItem: React.FC<IProps> = (
  {
    crypto,
    index,
    favorites,
    addFavorite,
    removeFavorite
  }) => {

  const isFavorite = favorites.includes(crypto.id)
  const priceChange = crypto.price_change_percentage_24h ?? 0
  const isPricePositive = !priceChange.toString().includes('-')

  return (
    <CardContent className="p-0 flex justify-between items-center">

      <div className="flex items-center gap-2">
        <span className="w-5 text-sm text-muted-foreground">{index + 1}</span>

        <Image
          width={36}
          height={36}
          className="h-9 w-9"
          src={crypto.image}
          alt={crypto.name}
        />

        <div className="grid gap-0.5">
          <p className="text-sm leading-none">
            {crypto.symbol.toUpperCase()}
          </p>
          <p className="text-[8.5px] font-semibold text-muted-foreground truncate">
            {crypto.name.length > 10 ? `${crypto.name.slice(0, 14)}...` : crypto.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p
          className={`${getDynamicFontSize(crypto.current_price.toString().length)} text-foreground font-bold whitespace-nowrap`}>
          {formatPrice(crypto.current_price)} $
        </p>

        <div
          className={`w-16 text-[13px] text-right ${isPricePositive ? 'text-primary' : 'text-secondary'}`}
        >
          <span className="font-semibold">{priceChange.toFixed(2)} %</span>
        </div>

        <button className="p-1 pb-[6px]"
                onClick={() => isFavorite ? removeFavorite(crypto.id) : addFavorite(crypto.id)}>
          {isFavorite ? <StarFavoriteIcon /> : <StarIcon />}
        </button>
      </div>
    </CardContent>
  )
}
