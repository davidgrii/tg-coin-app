'use client'

import React, { useState } from 'react'
import { CardContent } from '@/components/ui/card'
import { StarFavoriteIcon, StarIcon } from '@/components/icons'
import { ICrypto } from '@/types'
import { formatPrice, getDynamicFontSize } from '@/utils/formatters'
import Image from 'next/image'
import { useCryptoModalStore } from '@/store/crypto/crypto-modal.store'
import { CryptoItemDetails } from '@/components/crypto-item-details'


interface IProps {
  userId: string
  index: number
  crypto: ICrypto
  favorites: string[]
  addFavorite: (userId: string, id: string) => Promise<void>
  removeFavorite: (userId: string, id: string) => Promise<void>
  className?: string
}

export const CryptoItem: React.FC<IProps> = (
  {
    userId,
    crypto,
    index,
    favorites,
    addFavorite,
    removeFavorite
  }) => {

  const [loading, setLoading] = useState(false)
  const isFavorite = favorites.includes(crypto.id)
  const priceChange = crypto.price_change_percentage_24h ?? 0
  const isPricePositive = !priceChange.toString().includes('-')

  const { openModal, isOpen } = useCryptoModalStore()

  const handleFavoriteToggle = async (event: React.MouseEvent) => {
    event.stopPropagation()
    setLoading(true)

    try {
      if (isFavorite) {
        await removeFavorite(userId, crypto.id)
      } else {
        await addFavorite(userId, crypto.id)
      }

    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CardContent onClick={() => openModal(crypto, index)} className="p-0 flex justify-between items-center cursor-pointer">

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

          <button
            className="p-1 pb-[6px]"
            onClick={handleFavoriteToggle}
          >
            {isFavorite ?
              <StarFavoriteIcon
                width={16}
                height={16}
              />
              :
              <StarIcon
                width={16}
                height={16}
              />
            }
          </button>
        </div>

      </CardContent>

      {isOpen && <CryptoItemDetails favorites={favorites} index={index}/>}
    </>
  )
}
