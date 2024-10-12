'use client'

import { useEffect, useRef, useState } from 'react'
import { useCryptoStore, useInitializeCryptoStore, useSearchStore } from '@/store'
import { useCryptoFilter } from '@/hooks'
import { Container, CryptoItem, CryptoSkeleton, MarketTableHeader } from '@/components'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { SearchInput } from '@/components/market/index'
import i18n from '@/i18n'
import { ICrypto } from '@/types'

interface ICryptoClientProps {
  initialCryptoData: ICrypto[]
}

export default function MarketClient({ initialCryptoData }: ICryptoClientProps) {
  const isBrowser = typeof window !== 'undefined'
  const bot = isBrowser ? window.Telegram.WebApp : null
  const userId = isBrowser ? String(bot?.initDataUnsafe?.user?.id || '1422316270') : 'defaultUserId'

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

  const handleScroll = () => {
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
  }

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
    const timer = setTimeout(() => {
      if (isBrowser && bot) {
        bot.ready()
        // bot.setHeaderColor('#000')
        // bot.setBackgroundColor('#000')
        // bot.setBottomBarColor('#000')
        // bot.isVerticalSwipesEnabled = false

        if (!bot.isExpanded) {
          bot.expand()
        }

        const userLanguage = bot.initDataUnsafe?.user?.language_code || 'en'
        i18n.changeLanguage(userLanguage)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isBrowser, bot])

  return (
    <Container className={'pt-0 mb-20'}>
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
      </motion.div>
    </Container>
  )
}
