'use client'

import { useCryptoStore, useInitializeCryptoStore } from '@/store'
import { Container, CryptoSkeleton, CryptoTableHeader } from '@/components'
import { Card, CardContent } from '@/components/ui/card'
import { StarFavoriteIcon, StarIcon } from '@/components/icons'
import { useFavoritesCrypto } from '@/hooks'
import { EmptyFavorites } from '@/components/favorites'
import { motion } from 'framer-motion'

export default function FavoritesPage() {
  useInitializeCryptoStore()

  const { favorites, addFavorite, removeFavorite } = useCryptoStore()
  const { favoriteCryptoData, isLoading } = useFavoritesCrypto()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 6
    }).format(price);
  }

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
          transition={{ duration: 0.5 }}
        >
          <Card className={'bg-background grid gap-8 border-0'}>
            {favoriteCryptoData.length === 0 ? (
              <EmptyFavorites isFavoritesEmpty={favoriteCryptoData.length === 0} />
            ) : (
              favoriteCryptoData.map((crypto, index) => (
                <CardContent key={crypto.id} className={'p-0 flex justify-between'}>

                  <div className="flex items-center gap-2">
                    <span className={'w-5 text-sm text-muted-foreground'}>{index + 1}</span>
                    <div className="h-9 w-9">
                      <img src={crypto.image} alt="Avatar" />
                    </div>
                    <div className="grid gap-0.5">
                      <p className="text-sm leading-none">
                        {crypto.symbol.toUpperCase()}
                      </p>
                      <p className="text-[8.5px] font-semibold text-muted-foreground">
                        {crypto.name}
                      </p>
                    </div>
                  </div>

                  <div className={'flex items-center'}>
                    <p
                      className={`${crypto.current_price.toString().length > 8 ? 'text-[12px]' : 'text-sm'} text-muted-foreground mr-4 ml-2 whitespace-nowrap`}>
                      {formatPrice(crypto.current_price)} $
                    </p>

                    <div
                      className={`${crypto.price_change_percentage_24h.toString().includes('-')
                        ? 'text-secondary'
                        : 'text-primary'} w-16 text-sm text-right font-semibold mr-3`}
                    >
                      {crypto.price_change_percentage_24h.toFixed(2)} %
                    </div>

                    {favorites.includes(crypto.id) ? (
                      <button className={'p-1 pb-[6px]'} onClick={() => removeFavorite(crypto.id)}>
                        <StarFavoriteIcon />
                      </button>
                    ) : (
                      <button className={'p-1 pb-[6px'} onClick={() => addFavorite(crypto.id)}>
                        <StarIcon />
                      </button>
                    )}
                  </div>
                </CardContent>
              ))
            )}
          </Card>
        </motion.div>
      }

    </Container>
  )
}
