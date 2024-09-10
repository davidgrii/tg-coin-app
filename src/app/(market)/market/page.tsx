'use client'

import { Container, CryptoSkeleton, SearchInput } from '@/components'
import { useEffect, useRef, useState } from 'react'
import { useCryptoStore, useInitializeCryptoStore } from '@/store/crypto/cryptoStore'
import { StarFavoriteIcon, StarIcon } from '@/components/icons/icons'
import { Card, CardContent } from '@/components/ui/card'
import { useSearchStore } from '@/store/search/searchStore'
import { motion } from 'framer-motion'
import { useCrypto, useCryptoFilter } from '@/hooks'
import { CryptoTableHeader } from '@/components/crypto-table-header'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

export default function MarketPage() {
  useInitializeCryptoStore()

  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const { favorites, addFavorite, removeFavorite } = useCryptoStore()
  const { isSearchOpen } = useSearchStore()

  const { cryptoData, isLoading } = useCrypto()
  const { filteredCryptoData } = useCryptoFilter(cryptoData, searchValue)

  useEffect(() => {
    const bot = window.Telegram.WebApp
    if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
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

      <CryptoTableHeader/>

      {isLoading
        ? <CryptoSkeleton />
        : <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <Card className={'bg-background grid gap-6 border-0'}>
            {filteredCryptoData.length > 0 ? (
              filteredCryptoData.map((crypto, index) => (
                <motion.div key={crypto.id} variants={item}>
                  <CardContent
                    key={crypto.id}
                    className={'p-0 flex justify-between'}
                  >
                    <div className="flex items-center gap-2">
                      <span className={'w-5 text-sm text-muted-foreground'}>{index + 1}</span>
                      <div className="h-9 w-9">
                        <img src={crypto.image} alt="Avatar" />
                      </div>
                      <div className="grid gap-0.5">
                        <p className="text-sm leading-none">
                          {crypto.symbol.toUpperCase()}
                        </p>
                        <p className="text-[8.5px] font-semibold text-muted-foreground">
                          {crypto.name}
                        </p>
                      </div>
                    </div>

                    <div className={'flex items-center'}>
                      <p className={'text-sm text-muted-foreground mr-4'}>{crypto.current_price} $</p>

                      <div
                        className={`${crypto.price_change_percentage_24h.toString().includes('-')
                          ? 'text-secondary'
                          : 'text-primary'} w-16 text-sm text-right font-semibold mr-3`}
                      >
                        {crypto.price_change_percentage_24h.toFixed(2)} %
                      </div>

                      {favorites.includes(crypto.id) ? (
                        <button className={'p-1'} onClick={() => removeFavorite(crypto.id)}>
                          <StarFavoriteIcon />
                        </button>
                      ) : (
                        <button className={'p-1'} onClick={() => addFavorite(crypto.id)}>
                          <StarIcon />
                        </button>
                      )}
                    </div>
                  </CardContent>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No results found</p>
            )}
          </Card>
        </motion.div>
      }
    </Container>

  )
}
