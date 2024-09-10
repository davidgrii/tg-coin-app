'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { IGlobalMarketData } from '@/types'
import { cn } from '@/components/ui/utils'

interface IProps {
  className?: string
}

export const DashboardUserBalance: React.FC<IProps> = ({ className }) => {
  const [dashboardData, setDashboardData] = useState<IGlobalMarketData | null>(null)

  useEffect(() => {
    const fetchGlobalCryptoData = async () => {
      const res = await fetch('/api/global-data')
      const response = await res.json()

      const {data} = response
      setDashboardData(data)
    }

    fetchGlobalCryptoData()
  }, [])

  const totalMarketCapUSD = dashboardData?.total_market_cap?.usd || 0
  const marketCapChange24h = dashboardData?.market_cap_change_percentage_24h_usd || null

  const getMarketCapChangeClass = () => {
    if (marketCapChange24h === null) return 'text-muted'
    return marketCapChange24h < 0 ? 'text-secondary' : 'text-primary';
  }


  return (
    <Card className={'flex py-4 px-6 items-center justify-between rounded-xl border-0'}>
      <CardHeader className={'p-0 space-y-0.5'}>
        <CardTitle className={'text-xs text-muted-foreground'}>My balance</CardTitle>
        <CardDescription className={'text-sm text-foreground font-semibold'}>
          {totalMarketCapUSD.toLocaleString().split('.')[0]} $
        </CardDescription>
      </CardHeader>
      <CardContent className={'p-0'}>
        <p className={'text-xs text-muted-foreground font-medium text-right'}>24h</p>
        <p className={cn(getMarketCapChangeClass(), 'text-sm font-semibold transition-colors')}>
          {marketCapChange24h !== null ? marketCapChange24h.toFixed(2) : 'N/A'} %
        </p>
      </CardContent>
    </Card>
  )
};
