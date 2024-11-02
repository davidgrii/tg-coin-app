'use client'

import { Categories, Container } from '@/components'
import { motion } from 'framer-motion'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import { useCryptoStore } from '@/store'
import { TrendingCryptoItem, TrendingTableHeader } from '@/components/trending'
import { EmptyFavorites } from '@/components/favorites'
import { Card } from '@/components/ui/card'
import { useTrendingCryptoData } from '@/hooks'

export default function TrendingPage() {

  const { data: trendingCrypto, isLoading } = useTrendingCryptoData()
  const { favorites, addFavorite, removeFavorite } = useCryptoStore()
  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  if (isLoading) return <div> Loading </div>

  return (
    <Container className={'pt-0'}>

      <Categories />

      <TrendingTableHeader />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card className={'bg-background grid gap-8 border-0'}>
          {!trendingCrypto ? (
            <EmptyFavorites isFavoritesEmpty={true} />
          ) : (
            trendingCrypto.map((crypto, index) => (
              <TrendingCryptoItem
                userId={userId}
                key={crypto.id}
                crypto={crypto}
                favorites={favorites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
            ))
          )}
        </Card>
      </motion.div>
    </Container>
  )
}
