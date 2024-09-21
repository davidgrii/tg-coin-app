'use client'

import { useEffect, useRef, useState } from 'react'
import { useCryptoStore, useInitializeCryptoStore, useSearchStore } from '@/store'
import { useCrypto, useCryptoFilter } from '@/hooks'
import { Container, CryptoItem, CryptoSkeleton, CryptoTableHeader } from '@/components'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { SearchInput } from '@/components/market'
import i18n from '@/i18n'

export default function MarketPage() {
  useInitializeCryptoStore()

  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { favorites, addFavorite, removeFavorite } = useCryptoStore()
  const { isSearchOpen } = useSearchStore()
  const { cryptoData = [], isLoading } = useCrypto()
  const { filteredCryptoData } = useCryptoFilter(cryptoData, searchValue)

  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null)
  const [itemsToShow, setItemsToShow] = useState(10)
  const [isEndOfList, setIsEndOfList] = useState(false)

  useEffect(() => {
    if (isLoading && loadingStartTime === null) {
      setLoadingStartTime(Date.now())
    }
    if (!isLoading) {
      setLoadingStartTime(null)
    }
  }, [isLoading, loadingStartTime])

  const isShortLoading = loadingStartTime && (Date.now() - loadingStartTime < 200)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const bot = window.Telegram.WebApp;
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



  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 200
    ) {
      if (itemsToShow < filteredCryptoData.length) {
        setItemsToShow((prev) => prev + 10)
      } else {
        setIsEndOfList(true)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [itemsToShow, filteredCryptoData.length])

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
        {isLoading && !isShortLoading ? (
          <motion.div
            key="skeletons"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={'grid justify-start gap-8'}
          >
            {new Array(10).fill(null).map((_, index) => (
              <CryptoSkeleton key={index} />
            ))}
          </motion.div>
        ) : null}

        {!isLoading ? (
          <motion.div
            key="crypto-items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
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
            </Card>
          </motion.div>
        ) : null}
      </motion.div>
    </Container>
  );
}
