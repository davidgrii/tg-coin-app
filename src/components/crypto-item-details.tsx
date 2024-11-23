'use client'

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
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

// Модальное окно
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return ReactDOM.createPortal(
    <div
      className="fixed w-full h-full inset-0 z-50 flex items-center justify-center bg-[#1C1C1E] "
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-lg overflow-hidden relative p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-2.5 top-2.5 text-gray-500 hover:text-white"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}

// Основной компонент
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
    queryFn: () => fetchCryptoDetailsData(selectedCrypto?.id),
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
    <Modal isOpen={isOpen} onClose={closeModal}>
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
          {isFavorite ? (
            <StarFavoriteIcon width={16} height={16} />
          ) : (
            <StarIcon width={16} height={16} />
          )}
        </button>
      </div>

      {detailsData.markets_coin_data && (
        <DetailsCoinsData cryptoMarketCoinData={detailsData.markets_coin_data} />
      )}
      {detailsData.markets.length > 0 && (
        <DetailsMarketsData cryptoMarketsData={detailsData.markets} />
      )}
    </Modal>
  )
}
