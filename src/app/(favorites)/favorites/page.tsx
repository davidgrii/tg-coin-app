'use client'

import { useCryptoStore, useInitializeCryptoStore } from '@/store/crypto/cryptoStore'
import { Container } from '@/components'
import { Card, CardContent } from '@/components/ui/card'
import { StarFavoriteIcon, StarIcon } from '@/components/icons/icons'
import { CryptoTableHeader } from '@/components/crypto-table-header'
import { useFavoritesCrypto } from '@/hooks'


export default function FavoritesPage() {
  useInitializeCryptoStore()

  const { favorites, addFavorite, removeFavorite } = useCryptoStore()

  const {favoriteCryptoData, isLoading} = useFavoritesCrypto()

  return (
    <Container className={'pt-0 mb-20'}>

      <CryptoTableHeader />

      <Card className={'bg-background grid gap-7 border-0'}>
        {favoriteCryptoData.length === 0 ? (
          <p className={'text-center'}>No favorite cryptocurrencies found.</p>
        ) : (
          favoriteCryptoData.map((crypto, index) => (
            <CardContent key={crypto.id} className={'p-0 flex justify-between'}>

              <div className="flex items-center gap-3">
                <span className={'w-5 text-sm text-muted-foreground'}>{index + 1}</span>
                <div className="h-10 w-10">
                  <img src={crypto.image} alt="Avatar" />
                </div>
                <div className="grid gap-0.5">
                  <p className="text-sm leading-none">
                    {crypto.symbol.toUpperCase()}
                  </p>
                  <p className="text-[8px] font-semibold text-muted-foreground">
                    {crypto.name}
                  </p>
                </div>
              </div>

              <div className={'flex items-center'}>
                <p className={'text-sm text-muted-foreground mr-4'}>{crypto.current_price} $</p>

                <div
                  className={`${crypto.price_change_percentage_24h.toString().includes('-') ? 'text-secondary' : 'text-primary'} w-16 text-sm text-right font-semibold mr-6`}>
                  {crypto.price_change_percentage_24h.toFixed(2)} %
                </div>

                {favorites.includes(crypto.id) ? (
                  <button onClick={() => removeFavorite(crypto.id)}>
                    <StarFavoriteIcon />
                  </button>
                ) : (
                  <button onClick={() => addFavorite(crypto.id)}>
                    <StarIcon />
                  </button>
                )}
              </div>
            </CardContent>
          ))
        )}
      </Card>
    </Container>
  )
}
