'use client'

import { Container, CryptoItem, CryptoSkeleton, CryptoTableHeader } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { useCryptoStore, useInitializeCryptoStore, useSearchStore } from '@/store'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useCrypto, useCryptoFilter } from '@/hooks'
import { SearchInput } from '@/components/market'

export default function MarketPage() {
  useInitializeCryptoStore()

  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { favorites, addFavorite, removeFavorite, isLoading } = useCryptoStore()
  const { isSearchOpen } = useSearchStore()

  const { cryptoData = [], isLoadingData } = useCrypto()
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {isLoadingData ?
          <div className={'grid justify-start gap-8'}>
            {new Array(10).fill(null).map((_, index) => (
              <CryptoSkeleton key={index} />
            ))}
          </div>
          : <Card className={'bg-background grid gap-8 border-0'}>
            {filteredCryptoData.length > 0 && (
              filteredCryptoData.map((crypto, index) => (
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
        }
      </motion.div>
    </Container>
  )
}
