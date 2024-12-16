'use client'

import { motion } from 'framer-motion'
import { useCryptoStore, useInitializeCryptoStore } from '@/store'
import { Container, CryptoItem, CryptoSkeleton } from '@/components'
import { Card } from '@/components/ui/card'
import { EmptyFavorites, FavoritesTableHeader } from '@/components/favorites'
import { useEffect, useState } from 'react'
import { Categories } from '@/components/categories'
import { useTelegramUser } from '@/hooks/useTelegramUser'

export default function FavoritesPage() {
  const { data, isLoading: isLoadingUser } = useTelegramUser()
  const userId = data?.userId || ''

  useInitializeCryptoStore(userId)

  const { favorites, favoritesCryptoData,  addFavorite, removeFavorite, isLoading: isLoadingStore } = useCryptoStore()

  const [showEmptyMessage, setShowEmptyMessage] = useState(false)

  const isLoading = isLoadingUser || isLoadingStore

  useEffect(() => {
    if (!isLoading && favoritesCryptoData.length === 0) {
      const timer = setTimeout(() => {
        setShowEmptyMessage(true)
      }, 400)

      return () => clearTimeout(timer)
    }

    setShowEmptyMessage(false)
  }, [isLoading, favoritesCryptoData])

  return (
    <Container className={'pt-0'}>
      <Categories />

      <FavoritesTableHeader />

      {isLoading ? (
        <CryptoSkeleton itemsCount={10} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className={'bg-background grid gap-8 border-0'}>
            {showEmptyMessage ? (
              <EmptyFavorites isFavoritesEmpty={true} />
            ) : (
              favoritesCryptoData.map((crypto, index) => (
                <CryptoItem
                  userId={userId}
                  key={crypto.id}
                  crypto={crypto}
                  index={index}
                  favorites={favorites}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              ))
            )}
          </Card>
        </motion.div>
      )}
    </Container>
  )
}
