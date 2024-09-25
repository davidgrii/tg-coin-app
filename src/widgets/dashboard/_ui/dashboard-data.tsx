'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/components/ui/utils'
import { IGlobalMarketData } from '@/types'
import { useTranslation } from 'react-i18next'

interface IProps {
  className?: string
}

export const DashboardData: React.FC<IProps> = ({ className }) => {
  const [dashboardData, setDashboardData] = useState<IGlobalMarketData | null>(null)

  const { t } = useTranslation()

  const fetchGlobalCryptoData = useCallback(async () => {
    try {
      const res = await fetch(`https://priceme.store/api/global`, {
        cache: 'no-store',
      })

      if (!res.ok) {
        console.error('Ошибка при получении данных:', res.statusText)
        return
      }

      const response = await res.json()
      const { data } = response
      setDashboardData(data)
    } catch (error) {
      console.error('Произошла ошибка:', error)
    }
  }, [])

  useEffect(() => {
    fetchGlobalCryptoData()

    const interval = setInterval(() => {
      fetchGlobalCryptoData()
    }, 60000)

    return () => clearInterval(interval)
  }, [fetchGlobalCryptoData])

  const totalMarketCapUSD = Math.floor(dashboardData?.total_market_cap?.usd || 0)
  const marketCapChange24h = dashboardData?.market_cap_change_percentage_24h_usd || null

  const getMarketCapChangeClass = () => {
    if (marketCapChange24h === null) return 'text-muted'
    return marketCapChange24h < 0 ? 'text-secondary' : 'text-primary'
  }

  const formatNumberWithCommas = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <Card className={cn('flex py-4 pl-6 pr-9 items-center justify-between rounded-xl border-0', className)}>
      <CardHeader className={'p-0 space-y-0.5'}>
        <CardTitle className={'text-xs text-muted-foreground'}>{t('dashboard.market_cap')}</CardTitle>
        <CardDescription className={'text-sm text-foreground font-bold'}>
          {formatNumberWithCommas(totalMarketCapUSD)} $
        </CardDescription>
      </CardHeader>
      <CardContent className={'p-0'}>
        <p className={cn(getMarketCapChangeClass(), 'text-sm font-semibold transition-colors')}>
          {marketCapChange24h !== null ? marketCapChange24h.toFixed(2) : 'N/A'} %
        </p>
      </CardContent>
    </Card>
  )
}
