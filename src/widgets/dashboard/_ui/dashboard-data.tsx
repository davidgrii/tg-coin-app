'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/components/ui/utils'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useGlobalDataStore } from '@/store/global-data/global-data.store'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

interface IProps {
  className?: string
}

export const DashboardData: React.FC<IProps> = ({ className }) => {
  const { dashboardData, fetchGlobalData } = useGlobalDataStore()

  const { t } = useTranslation()

  useEffect(() => {
    fetchGlobalData()

    const interval = setInterval(() => {
      fetchGlobalData()
    }, 60000)

    return () => clearInterval(interval)
  }, [fetchGlobalData])

  const totalMarketCapUSD = Math.floor(dashboardData?.total_market_cap?.usd || 0)
  const totalVolume24hUSD = Math.floor(dashboardData?.total_volume?.usd || 0)
  const marketCapChange24h = dashboardData?.market_cap_change_percentage_24h_usd || null
  const marketCapPercentageBTC = dashboardData?.market_cap_percentage?.btc || 0

  const getMarketCapChangeClass = () => {
    if (marketCapChange24h === null) return 'text-muted'
    return marketCapChange24h < 0 ? 'text-secondary' : 'text-primary'
  }

  const formatNumberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <Carousel plugins={[
      Autoplay({
        delay: 8000,
      }),
    ]} opts={{
      loop: true
    }}>
      <CarouselContent className={'select-none'}>
        <CarouselItem>
          <Card
            className={cn('flex py-4 pl-6 pr-9 items-center cursor-pointer relative justify-between rounded-xl border-0', className)}>
            <CardHeader className={'p-0 space-y-0.5'}>
              <CardTitle className={'text-xs text-muted-foreground'}>{t('dashboard.market_cap')}</CardTitle>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
              >
                <CardDescription className={'text-sm text-foreground font-bold'}>
                  {formatNumberWithCommas(totalMarketCapUSD)} $
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className={'p-0'}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
              >
                <p className={cn(getMarketCapChangeClass(), 'text-sm font-semibold transition-colors')}>
                  {marketCapChange24h !== null ? marketCapChange24h.toFixed(2) : 'N/A'} %
                </p>
              </motion.div>
            </CardContent>

            <div className={'flex gap-2 absolute bottom-1.5 left-1/2 -translate-x-1/2'}>
              <span className={'w-1.5 h-1.5 rounded-full bg-[#D9D9D9]'}></span>
              <span className={'w-1.5 h-1.5 rounded-full border-[#D9D9D9]/65 border'}></span>
            </div>
          </Card>
        </CarouselItem>

        <CarouselItem>
          <Card
            className={cn('flex py-4 pl-6 pr-9 relative h-[70px] items-center cursor-pointer justify-between rounded-xl border-0', className)}>
            <CardHeader className={'p-0 space-y-0.5'}>
              <CardTitle className={'text-xs text-muted-foreground'}>{t('dashboard.trending')}</CardTitle>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
              >
                <CardDescription className={'text-sm text-foreground font-bold'}>
                  {formatNumberWithCommas(totalVolume24hUSD)} $
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className={'p-0'}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
                className={'text-right leading-none'}
              >
                <span className={'text-xs text-muted-foreground'}>{t('dashboard.dominance')}</span>

                <p className={'text-sm text-foreground font-semibold'}>
                  BTC {marketCapPercentageBTC.toFixed(2)} %
                </p>
              </motion.div>
            </CardContent>

            <div className={'flex gap-2 absolute bottom-1.5 left-1/2 -translate-x-1/2'}>
              <span className={'w-1.5 h-1.5 rounded-full border-[#D9D9D9]/65 border'}></span>
              <span className={'w-1.5 h-1.5 rounded-full bg-[#D9D9D9]'}></span>
            </div>
          </Card>

        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
