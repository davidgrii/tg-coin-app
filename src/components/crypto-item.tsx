import React from 'react'
import { CardContent } from '@/components/ui/card'
import { StarFavoriteIcon, StarIcon } from '@/components/icons'
import { ICrypto } from '@/types'
import { formatPrice, getDynamicFontSize } from '@/components/utils/utils'

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
    removeFavorite,
  }) => {

  return (
    <CardContent className={'p-0 flex justify-between'}>
      <div className="flex items-center gap-2">
        <span className={'w-5 text-sm text-muted-foreground'}>{index + 1}</span>
        <div className="h-9 w-9">
          <img className={'h-full'} src={crypto.image} alt={crypto.name} />
        </div>
        <div className="grid gap-0.5">
          <p className="text-sm leading-none">
            {crypto.symbol.toUpperCase()}
          </p>
          <p className="text-[8.5px] font-semibold text-muted-foreground truncate">
            {crypto.name.length > 10 ? `${crypto.name.slice(0, 14)}...` : crypto.name}
          </p>
        </div>
      </div>

      <div className={'flex items-center'}>
        <p
          className={`${getDynamicFontSize(crypto.current_price.toString().length)} text-muted-foreground font-bold mr-4 ml-2.5 whitespace-nowrap`}>
          {formatPrice(crypto.current_price)} $
        </p>

        <div
          className={`${(crypto.price_change_percentage_24h ?? 0).toString().includes('-')
            ? 'text-secondary'
            : 'text-primary'} w-16 text-[13px] text-right mr-2`
          }
        >
        <span className={'font-semibold'}>
          {(crypto.price_change_percentage_24h ?? 0).toFixed(2)} %
        </span>
        </div>

        {favorites.includes(crypto.id) ? (
          <button className={'p-1 pb-[6px]'} onClick={() => removeFavorite(crypto.id)}>
            <StarFavoriteIcon />
          </button>
        ) : (
          <button className={'p-1 pb-[6px'} onClick={() => addFavorite(crypto.id)}>
            <StarIcon />
          </button>
        )}
      </div>
    </CardContent>
  )
}
