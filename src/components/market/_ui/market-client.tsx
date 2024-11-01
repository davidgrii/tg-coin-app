'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useCryptoStore, useInitializeCryptoStore, useSearchStore } from '@/store'
import { useCryptoFilter } from '@/hooks'
import { Container, CryptoItem, CryptoSkeleton } from '@/components'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { MarketTableHeader, SearchInput } from '@/components/market'
import { ICrypto } from '@/types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useTelegramStore } from '@/store/telegram/telegram.store'
import { Categories } from '@/components/categories'

interface ICryptoClientProps {
  initialCryptoData: ICrypto[] | []
}

export default function MarketClient({ initialCryptoData }: ICryptoClientProps) {

  const { bot, userId, initializeBot, recordVisit } = useTelegramStore()

  useInitializeCryptoStore(userId)

  const setCryptoData = useCryptoStore((state) => state.setCryptoData)

  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { favorites, addFavorite, removeFavorite } = useCryptoStore()
  const { isSearchOpen } = useSearchStore()

  const [itemsToShow, setItemsToShow] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [isEndOfList, setIsEndOfList] = useState(false)

  const { filteredCryptoData } = useCryptoFilter(initialCryptoData, searchValue)

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      if (itemsToShow < filteredCryptoData.length && !isLoading) {
        loadMoreItems()
      } else {
        setIsEndOfList(true)
      }
    }
  }, [itemsToShow, filteredCryptoData.length, isLoading])

  const loadMoreItems = () => {
    setIsLoading(true)
    setTimeout(() => {
      setItemsToShow(prev => prev + 10)
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [itemsToShow, filteredCryptoData.length, handleScroll])

  useEffect(() => {
    if (initialCryptoData) {
      setCryptoData(initialCryptoData)
    }
  }, [initialCryptoData, setCryptoData])

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

  return (
    <Container className={'pt-0 mb-20'}>
      <Categories/>

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
        <InfiniteScroll
          dataLength={itemsToShow}
          next={loadMoreItems}
          hasMore={itemsToShow < filteredCryptoData.length}
          loader={<div className="grid justify-start gap-8">{isLoading && <CryptoSkeleton />}</div>}
          endMessage={<p>No more items to load</p>}
          scrollThreshold={0.9}
        >
          <Card className={'bg-background grid gap-8 border-0'}>
            {filteredCryptoData.slice(0, itemsToShow).map((crypto, index) => (
              <CryptoItem
                userId={userId}
                key={crypto.id}
                crypto={crypto}
                index={index}
                favorites={favorites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />
            ))}

            {isLoading && (
              <motion.div
                className={'grid justify-start gap-8'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {new Array(10).fill(null).map((_, index) => (
                  <CryptoSkeleton key={index} />
                ))}
              </motion.div>
            )}
          </Card>
        </InfiniteScroll>
      </motion.div>
    </Container>
  )
}
