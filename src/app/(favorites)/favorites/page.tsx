'use client'

import { useCryptoStore, useInitializeCryptoStore } from '@/store'
import { Container, CryptoItem } from '@/components'
import { Card } from '@/components/ui/card'
import { useFavoritesCrypto } from '@/hooks'
import { EmptyFavorites } from '@/components/favorites'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import i18n from '@/i18n'
import { FavoritesTableHeader } from '@/components/favorites/_ui/favorites-table-header'

export default function FavoritesPage() {
  const isBrowser = typeof window !== 'undefined'
  const bot = isBrowser ? window.Telegram.WebApp : null
  const userId = isBrowser ? String(bot?.initDataUnsafe?.user?.id || '1422316270') : 'defaultUserId'

  useInitializeCryptoStore(userId)

  const { favorites, addFavorite, removeFavorite, isLoading } = useCryptoStore()
  const { favoriteCryptoData } = useFavoritesCrypto()

  const [showEmptyMessage, setShowEmptyMessage] = useState(false)

  useEffect(() => {
    if (!isLoading && favoriteCryptoData.length === 0) {
      const timer = setTimeout(() => {
        setShowEmptyMessage(true)
      }, 300)

      return () => clearTimeout(timer)
    }

    setShowEmptyMessage(false)
  }, [isLoading, favoriteCryptoData])

  useEffect(() => {
    const userLanguage = bot?.initDataUnsafe?.user?.language_code || 'en'
    i18n.changeLanguage(userLanguage)
  }, [bot?.initDataUnsafe?.user?.language_code])

  return (
    <Container className={'pt-0'}>
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
