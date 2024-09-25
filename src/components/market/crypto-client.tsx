'use client'

import { useEffect, useRef, useState } from 'react'
import { useCryptoStore, useInitializeCryptoStore, usePortfolioStore, useSearchStore } from '@/store'
import { useCryptoFilter } from '@/hooks'
import { Container, CryptoItem, CryptoSkeleton, CryptoTableHeader } from '@/components'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { SearchInput } from '@/components/market/index'
import i18n from '@/i18n'
import { ICrypto } from '@/types'

interface CryptoClientProps {
  initialCryptoData: ICrypto[]
}

export default function CryptoClient({ initialCryptoData }: CryptoClientProps) {
  useInitializeCryptoStore()

  const setCryptoData = useCryptoStore((state) => state.setCryptoData)
  const updatePortfolioFromCryptoData = usePortfolioStore((state) => state.updatePortfolioFromCryptoData)

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
  }, [itemsToShow, filteredCryptoData.length])

  useEffect(() => {
    if (initialCryptoData) {
      setCryptoData(initialCryptoData)
      updatePortfolioFromCryptoData(initialCryptoData)
    }
  }, [initialCryptoData, setCryptoData, updatePortfolioFromCryptoData])

  // Логика для Telegram WebApp
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

      const userLanguage = bot.initDataUnsafe?.user?.language_code || 'en'
      i18n.changeLanguage(userLanguage)
    } else {
      document.body.style.backgroundColor = '#000'
    }
  }, [])

  return (
    <Container className={'pt-0 mb-20'}>
      {isSearchOpen && (
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          inputRef={inputRef}
        />
      )}

      <CryptoTableHeader />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Card className={'bg-background grid gap-8 border-0'}>
          {filteredCryptoData.slice(0, itemsToShow).map((crypto, index) => (
            <CryptoItem
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
  );
}
