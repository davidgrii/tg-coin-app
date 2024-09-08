'use client'
import { Container } from '@/components'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { useCryptoStore, useInitializeCryptoStore } from '@/store/cryptoStore'
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
  useInitializeCryptoStore()

  const [cryptoData, setCryptoData] = useState<ICrypto[]>([])
  const { favorites, addFavorite, removeFavorite } = useCryptoStore()

  useEffect(() => {
    // Проверяем, доступен ли объект Telegram
    if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();

      // Установка цветовой схемы
      document.body.style.backgroundColor = "#000";
      window.Telegram.WebApp.setHeaderColor("#000");
      window.Telegram.WebApp.setFooterColor("#000");
      console.warn('window.Telegram is not available. Running locally.');
      // Здесь можно установить стили по умолчанию или другие настройки для локальной разработки
      document.body.style.backgroundColor = "#000"; // Например, белый фон
    }
  }, []);

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

      <Card className={'flex py-4 px-6 items-center justify-between rounded-xl border-0'}>
        <CardHeader className={'p-0 space-y-0.5'}>
          <CardTitle className={'text-sm'}>Market Cap</CardTitle>
          <CardDescription className={'text-xs text-muted-foreground font-semibold'}>2,108,769,146,104,69
            $</CardDescription>
        </CardHeader>
        <CardContent className={'p-0'}>
          <p className={'text-sm text-secondary font-semibold'}>-6.26 %</p>
        </CardContent>
      </Card>

      <div className={'flex justify-between text-sm font-medium text-muted-foreground mt-6 mb-4'}>
        <div className={'flex gap-6'}>
          <div>#</div>
          <div>Coin</div>
        </div>
        <div className={'flex gap-10 mr-10'}>
          <div>Price</div>
          <div>24h %</div>
        </div>
      </div>

      <Card className={'bg-background grid gap-7 border-0'}>
        {cryptoData.map((crypto, index) => (
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
        ))}
      </Card>
    </Container>
  )
}
