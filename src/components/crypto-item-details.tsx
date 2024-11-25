'use client'

import { useCryptoModalStore } from '@/store/crypto/crypto-modal.store'
import React, { useState } from 'react'
import Image from 'next/image'
import { CryptoModal } from '@/components/ui/crypto-modal'
import { useCryptoModal } from '@/hooks/useCryptoModalData'
import { DetailsCoinsData } from '@/components/details-coins-data'
import { DetailsMarketsData } from '@/components/details-markets-data'
import { formatPrice, getDynamicFontSize } from '@/utils/formatters'
import { StarFavoriteIcon } from '@/components/icons'
import { StarIcon } from 'lucide-react'

interface IProps {
  favorites: string[]
  userId: string
  index: number
  addFavorite: (userId: string, id: string) => Promise<void>
  removeFavorite: (userId: string, id: string) => Promise<void>
  className?: string
}

export const CryptoItemDetails: React.FC<IProps> = ({ userId, favorites, removeFavorite, addFavorite, className }) => {
  const { isOpen, closeModal, selectedCrypto, index } = useCryptoModalStore()
  const [loading, setLoading] = useState(false)
  const { data: detailsData } = useCryptoModal(selectedCrypto)

  if (!isOpen || !selectedCrypto || !detailsData) return null

  const cryptoPrice = selectedCrypto?.current_price || selectedCrypto?.price || 0
  const isFavorite = favorites.includes(selectedCrypto.id)

  // const handleFavoriteToggle = async (event: React.MouseEvent) => {
  //   event.stopPropagation()
  //   setLoading(true)
  //
  //   try {
  //     if (isFavorite) {
  //       await removeFavorite(userId, selectedCrypto.id)
  //     } else {
  //       await addFavorite(userId, selectedCrypto.id)
  //     }
  //   } catch (error) {
  //     console.error('Error toggling favorite:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (

    <CryptoModal isOpen={isOpen} onClose={closeModal}>
      <div className="flex justify-between w-full bg-accent items-center gap-3 px-6 py-4 rounded-[10px]">
        <div className={'flex items-center gap-2'}>
          <Image
            width={36}
            height={36}
            className="h-9 w-9"
            src={selectedCrypto.image}
            alt={selectedCrypto.name}
          />

          <div className="flex flex-col items-start">
            <div className={'flex gap-1 h-4'}>
              <p className="text-[11px] font-semibold text-muted-foreground truncate">
                {selectedCrypto.name.length > 10 ? `${selectedCrypto.name.slice(0, 14)}...` : selectedCrypto.name}
              </p>
              <span className="w-5 text-[11px] text-muted-foreground font-medium">#{index}</span>
            </div>

            <p
              className={`${getDynamicFontSize(cryptoPrice)} text-foreground font-bold whitespace-nowrap`}>
              {formatPrice(cryptoPrice)} $
            </p>
          </div>
        </div>

        <button
          className="p-1"
        >
          {isFavorite ? (
            <StarFavoriteIcon width={16} height={16} />
          ) : (
            <StarIcon width={16} height={16} />
          )}
        </button>
      </div>

      {detailsData.markets_coin_data && (
        <React.Suspense fallback={<div>Loading Coin Data...</div>}>
          <DetailsCoinsData cryptoMarketCoinData={detailsData.markets_coin_data} />
        </React.Suspense>
      )}

      {detailsData.markets?.length > 0 && (
        <React.Suspense fallback={<div>Loading Market Data...</div>}>
          <DetailsMarketsData cryptoMarketsData={detailsData.markets} />
        </React.Suspense>
      )}
    </CryptoModal>
  )
}
