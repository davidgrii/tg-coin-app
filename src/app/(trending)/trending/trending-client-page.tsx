'use client'

import { motion } from 'framer-motion'
import { useTelegramUser } from '@/hooks/useTelegramUser'
import { TrendingCryptoItem } from '@/components/trending'
import { EmptyFavorites } from '@/components/favorites'
import { Card } from '@/components/ui/card'
import { useTrendingCryptoData } from '@/hooks'
import { useCryptoStore } from '@/store'
import { ITrendingCrypto } from '@/types'

interface IProps {
  initialData: ITrendingCrypto[]
}

export default function TrendingClientPage({ initialData }: IProps) {
  const { data: trendingCrypto = initialData } = useTrendingCryptoData(initialData)
  const { favorites, addFavorite, removeFavorite } = useCryptoStore()
  const { data } = useTelegramUser()
  const userId = data?.userId || ''

  return (
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
  )
}
