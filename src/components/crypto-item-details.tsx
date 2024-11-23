'use client'

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon'
import Image from 'next/image'
import { formatPrice, getDynamicFontSize } from '@/utils/formatters'
import { StarFavoriteIcon, StarIcon } from '@/components/icons'
import { useCryptoModalStore } from '@/store/crypto/crypto-modal.store'
import { useQuery } from '@tanstack/react-query'
import { ICryptoDetails } from '@/types'
import { DetailsCoinsData, DetailsMarketsData } from '@/components'

const fetchCryptoDetailsData = async (id: string | undefined): Promise<ICryptoDetails> => {
  if (!id) throw new Error('No crypto ID provided')
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cryptos/${id}`)

  if (!res.ok) {
    console.log('Failed to fetch crypto details')
  }

  return res.json()
}

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

  const { data: detailsData, isLoading } = useQuery({
    queryKey: ['cryptoDetails', selectedCrypto?.id],
    queryFn: () => fetchCryptoDetailsData(selectedCrypto?.id),
    staleTime: 30 * 60 * 1000,
    enabled: !!selectedCrypto
  })

  if (!isOpen || !selectedCrypto || !detailsData) return null

  const cryptoPrice = selectedCrypto?.current_price || selectedCrypto?.price || 0

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

  const isFavorite = favorites.includes(selectedCrypto.id)

  return (
    <AlertDialog open={isOpen} onOpenChange={closeModal}>
      <AlertDialogContent className={'w-full h-full overflow-y-auto rounded-none bg-[#1C1C1E] px-4'}>
        <AlertDialogCancel
          className={'absolute right-2.5 top-1 text-muted-foreground border-0 bg-background/0 px-0 py-0 h-8 w-8 hover:bg-background/0 hover:text-foreground active:border-none'}>
          <CloseIcon />
        </AlertDialogCancel>

        <AlertDialogTitle className={'mx-auto flex-col justify-center items-start w-full max-w-3xl mt-4'}>
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

          {detailsData.markets_coin_data ?
            <DetailsCoinsData cryptoMarketCoinData={detailsData.markets_coin_data} /> : null
          }

          {detailsData.markets.length > 0
            ? <DetailsMarketsData cryptoMarketsData={detailsData.markets} /> : null
          }

        </AlertDialogTitle>
        <AlertDialogDescription></AlertDialogDescription>

      </AlertDialogContent>
    </AlertDialog>
  )
}
