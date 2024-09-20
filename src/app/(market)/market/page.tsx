'use client'

import { Container, CryptoSkeleton, CryptoTableHeader } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { useCryptoStore, useInitializeCryptoStore, useSearchStore } from '@/store'
import { StarFavoriteIcon, StarIcon } from '@/components/icons'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useCrypto, useCryptoFilter } from '@/hooks'
import { SearchInput } from '@/components/market'

export default function MarketPage() {
  useInitializeCryptoStore()

  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { favorites, addFavorite, removeFavorite, isLoading } = useCryptoStore()
  const { isSearchOpen } = useSearchStore()

  const { cryptoData = []} = useCrypto()
  const { filteredCryptoData } = useCryptoFilter(cryptoData, searchValue)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const bot = window.Telegram.WebApp

      bot.ready()
      bot.setHeaderColor('#000')
      bot.setBackgroundColor('#000')
      bot.setBottomBarColor('#000')

      bot.isVerticalSwipesEnabled = false

      if (!bot.isExpanded) {
        bot.expand()
      }

    } else {
      document.body.style.backgroundColor = '#000'
    }
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 6
    }).format(price);
  }

  return (
    <Container className={'pt-0 mb-20'}>

      {isSearchOpen &&
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          inputRef={inputRef}
        />
      }

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
            {filteredCryptoData.length > 0 && (
              filteredCryptoData.map((crypto, index) => (
                <CardContent key={crypto.id} className={'p-0 flex justify-between'}>
                  <div className="flex items-center gap-2">
                    <span className={'w-5 text-sm text-muted-foreground'}>{index + 1}</span>
                    <div className="h-9 w-9">
                      <img className={'h-full'} src={crypto.image} alt={crypto.name} />
                    </div>
                    <div className="grid gap-0.5">
                      <p className="text-sm leading-none">
                        {crypto.symbol.toUpperCase()}
                      </p>
                      <p className="text-[8.5px] font-semibold text-muted-foreground truncate">
                        {crypto.name.length > 10 ? `${crypto.name.slice(0, 14)}...` : crypto.name}
                      </p>
                    </div>
                  </div>

                  <div className={'flex items-center'}>
                    <p
                      className={`text-sm text-muted-foreground mr-4 ml-2 whitespace-nowrap`}>
                      {formatPrice(crypto.current_price)} $
                    </p>

                    <div
                      className={`${(crypto.price_change_percentage_24h ?? 0).toString().includes('-')
                        ? 'text-secondary'
                        : 'text-primary'} w-16 text-sm text-right font-bold mr-3`}
                    >
                        <span className={'font-semibold'}>
                          {(crypto.price_change_percentage_24h ?? 0).toFixed(2)} %
                        </span>
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
