'use client'

import { useCryptoStore, useInitializeCryptoStore } from '@/store'
import { Container, CryptoItem, CryptoSkeleton, CryptoTableHeader } from '@/components'
import { Card } from '@/components/ui/card'
import { useFavoritesCrypto } from '@/hooks'
import { EmptyFavorites } from '@/components/favorites'
import { motion } from 'framer-motion'

export default function FavoritesPage() {
  useInitializeCryptoStore()

  const { favorites, addFavorite, removeFavorite, isLoading } = useCryptoStore()
  const { favoriteCryptoData } = useFavoritesCrypto()

  return (
    <Container className={'pt-0 mb-20'}>

      <CryptoTableHeader />

      {isLoading ?
        <div className={'grid justify-start gap-8'}>
          {new Array(10).fill(null).map((_, index) => (
            <CryptoSkeleton key={index} />
          ))}
        </div>
        : <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Card className={'bg-background grid gap-8 border-0'}>
            {favoriteCryptoData.length === 0 ? (
              <EmptyFavorites isFavoritesEmpty={favoriteCryptoData.length === 0} />
            ) : (
              favoriteCryptoData.map((crypto, index) => (
                <CryptoItem
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
      }

    </Container>
  )
}
