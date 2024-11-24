'use client'

import { formatPrice, getDynamicFontSize } from '@/utils/formatters'
import { StarFavoriteIcon, StarIcon } from '@/components/icons'
import { useCryptoModalStore } from '@/store/crypto/crypto-modal.store'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { CryptoModal } from '@/components/ui/crypto-modal'

// const fetchCryptoDetailsData = async (id: string | undefined): Promise<ICryptoDetails> => {
//   if (!id) throw new Error('No crypto ID provided');
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cryptos/${id}`, { method: 'GET' });
//
//   if (!res.ok) {
//     console.error(`Error fetching details: ${res.status}`);
//     throw new Error('Failed to fetch crypto details');
//   }
//
//   const data = await res.json();
//   if (!data || typeof data !== 'object') {
//     throw new Error('Invalid response format');
//   }
//
//   return data;
// }

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

  const { data: detailsData } = useQuery({
    queryKey: ['cryptoDetails', selectedCrypto?.id],
    // queryFn: () => fetchCryptoDetailsData(selectedCrypto?.id),
    staleTime: 30 * 60 * 1000,
    enabled: !!selectedCrypto
  })

  if (!isOpen || !selectedCrypto || !detailsData) return null

  const cryptoPrice = selectedCrypto?.current_price || selectedCrypto?.price || 0
  const isFavorite = favorites.includes(selectedCrypto.id)

  const handleFavoriteToggle = async (event: React.MouseEvent) => {
    event.stopPropagation()
    setLoading(true)

    try {
      if (isFavorite) {
        await removeFavorite(userId, selectedCrypto.id)
      } else {
        await addFavorite(userId, selectedCrypto.id)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CryptoModal isOpen={isOpen} onClose={closeModal}>
      <div className="modal flex justify-between w-full bg-accent items-center gap-3 px-6 py-4 rounded-[10px]">
        <div className={'flex items-center gap-2'}>
          <img
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
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? (
            <StarFavoriteIcon width={16} height={16} />
          ) : (
            <StarIcon width={16} height={16} />
          )}
        </button>
      </div>

      {/*{detailsData.markets_coin_data && (*/}
      {/*  <DetailsCoinsData cryptoMarketCoinData={detailsData.markets_coin_data} />*/}
      {/*)}*/}
      {/*{detailsData.markets.length > 0 && (*/}
      {/*  <DetailsMarketsData cryptoMarketsData={detailsData.markets} />*/}
      {/*)}*/}
    </CryptoModal>
  )
}
