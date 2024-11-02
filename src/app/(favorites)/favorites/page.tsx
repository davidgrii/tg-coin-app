'use client'

import { useCryptoStore, useInitializeCryptoStore } from '@/store'
import { Container, CryptoItem } from '@/components'
import { Card } from '@/components/ui/card'
import { useFavoritesCrypto } from '@/hooks'
import { EmptyFavorites, FavoritesTableHeader } from '@/components/favorites'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Categories } from '@/components/categories'
import { useTelegramUser } from '@/hooks/useTelegramUser'

export default function FavoritesPage() {
  const { data, isLoading: isLoadingUser } = useTelegramUser()
  const userId = data?.userId || ''

  useInitializeCryptoStore(userId)

  const { favorites, addFavorite, removeFavorite, isLoading: isLoadingStore } = useCryptoStore()
  const { favoriteCryptoData } = useFavoritesCrypto()

  const [showEmptyMessage, setShowEmptyMessage] = useState(false)

  const isLoading = isLoadingUser || isLoadingStore

  useEffect(() => {
    if (!isLoading && favoriteCryptoData.length === 0) {
      const timer = setTimeout(() => {
        setShowEmptyMessage(true)
      }, 400)

      return () => clearTimeout(timer)
    }

    setShowEmptyMessage(false)
  }, [isLoading, favoriteCryptoData])

  return (
    <Container className={'pt-0'}>
      <Categories />

      <FavoritesTableHeader />

      {isLoading ? (
        <motion.div
          className={'grid justify-start gap-8'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/*{new Array(10).fill(null).map((_, index) => (*/}
          {/*  <CryptoSkeleton key={index} />*/}
          {/*))}*/}
        </motion.div>
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
              favoriteCryptoData.map((crypto, index) => (
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
