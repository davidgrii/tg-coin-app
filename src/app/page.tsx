'use client'
import { Container } from '@/components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useCryptoStore } from '@/store/cryptoStore'
import { StarFavoriteIcon, StarIcon } from '@/components/icons/icons'

interface ICrypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function MarketPage() {
  const [cryptoData, setCryptoData] = useState<ICrypto[]>([])
  const {favorites, addFavorite, removeFavorite  } = useCryptoStore()

  useEffect(() => {
    const fetchCryptoData = async () => {
      const res = await fetch('/api/crypto-data')
      const data = await res.json()

      setCryptoData(data)
    }

    fetchCryptoData()
  }, [])


  return (
    <Container>
      <Card className={'flex py-6 px-12 items-center justify-between rounded-3xl border-0'}>
        <CardHeader className={'p-0'}>
          <CardTitle className={'text-lg'}>Market Cap</CardTitle>
          <CardDescription className={'text-muted-foreground font-semibold'}>2,108,769,146,104,69 $</CardDescription>
        </CardHeader>
        <CardContent className={'p-0'}>
          <p className={'text-lg text-secondary font-semibold'}>-6.26 %</p>
        </CardContent>
      </Card>

      <div className={'flex justify-between text-sm font-medium text-muted-foreground mt-10 mb-5'}>
        <div className={'flex gap-12'}>
          <div>#</div>
          <div>Coin</div>
        </div>
        <div className={'flex gap-12 mr-12'}>
          <div>Price</div>
          <div>24h %</div>
        </div>
      </div>

      <Card className={'bg-background grid gap-8 border-0'}>
        {cryptoData.map((crypto, index) => (
          <CardContent key={crypto.id} className={'p-0 flex justify-between'}>

            <div className="flex items-center gap-4">
              <span className={'w-10 text-lg text-muted-foreground'}>{index + 1}</span>
              <div className="h-12 w-12">
                <img src={crypto.image} alt="Avatar" />
              </div>
              <div className="grid gap-0.5">
                <p className="text-lg leading-none">
                  {crypto.symbol.toUpperCase()}
                </p>
                <p className="text-[10px] font-semibold text-muted-foreground">
                  {crypto.name}
                </p>
              </div>
            </div>

            <div className={'flex items-center'}>
              <div className="text-muted-foreground mr-7">{crypto.current_price} $</div>

              <div
                className={`${crypto.price_change_percentage_24h.toString().includes('-') ? 'text-secondary' : 'text-primary'} w-16 text-right font-semibold mr-6`}>
                {crypto.price_change_percentage_24h.toFixed(2)} %
              </div>

              {favorites.includes(crypto.id) ? (
                <button onClick={() => removeFavorite(crypto.id)}>
                  <StarFavoriteIcon/>
                </button>
              ) : (
                <button onClick={() => addFavorite(crypto.id)}>
                  <StarIcon />
                </button>
              )}

            </div>
          </CardContent>

        ))}
      </Card>
    </Container>
  )
}
