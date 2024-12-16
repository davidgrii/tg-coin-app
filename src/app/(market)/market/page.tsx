'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useCryptoStore, useInitializeCryptoStore, useSearchStore } from '@/store'
import { useCryptoData, useCryptoFilter } from '@/hooks'
import { Container, CryptoItem, CryptoSkeleton } from '@/components'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { MarketTableHeader, SearchInput } from '@/components/market'
import { useTelegramStore } from '@/store/telegram/telegram.store'
import { Categories } from '@/components/categories'
import { LoadMoreIndicator } from '@/components/load-more-indicator'

export default function MarketPage() {
  const { data: initialCryptoData = [], fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useCryptoData()
  const { bot, userId, initializeBot, recordVisit } = useTelegramStore()

  useInitializeCryptoStore(userId)

  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { favorites, addFavorite, removeFavorite } = useCryptoStore()
  const { isSearchOpen } = useSearchStore()

  const { filteredCryptoData } = useCryptoFilter(
    initialCryptoData
      .filter(crypto => crypto.market_cap_rank >= 1 && crypto.market_cap_rank <= 1000)
      .sort((a, b) => a.market_cap_rank - b.market_cap_rank),
    searchValue
  )

  // Логика для Telegram WebApp
  useEffect(() => {
    const handleInitializeBot = async () => {
      await initializeBot()
    }

    handleInitializeBot().catch(error => {
      console.error('Ошибка при инициализации бота:', error)
    })
  }, [initializeBot])

  useEffect(() => {
    const handleRecordVisit = async () => {
      if (bot) {
        await recordVisit(userId)
      }
    }

    handleRecordVisit().catch(error => {
      console.error('Ошибка при записи визита:', error)
    })
  }, [bot, userId, recordVisit])

  const cursorRef = useIntersection(() => {
    fetchNextPage()
  })

  return (
    <Container className={'pt-0 mb-20'}>
      <Categories />

      {isSearchOpen && (
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          inputRef={inputRef}
        />
      )}

      <MarketTableHeader />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: filteredCryptoData.length > 0 ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Card className={'bg-background grid gap-8 border-0'}>
          {!isLoading ? (
              filteredCryptoData.map((crypto, index) => (
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
            )
            : <CryptoSkeleton itemsCount={10} />
          }

          <div ref={cursorRef}>
            <LoadMoreIndicator
              cursorRef={cursorRef}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </div>
        </Card>
      </motion.div>
    </Container>
  )
}

export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {})

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(intersection => {
        if (intersection.isIntersecting) {
          onIntersect()
        }
      })
    })

    if (el) {
      observer.observe(el)
      unsubscribe.current = () => observer.disconnect()
    } else {
      unsubscribe.current()
    }
  }, [onIntersect])
}