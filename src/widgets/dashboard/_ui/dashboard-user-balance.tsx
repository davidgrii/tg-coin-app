'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/components/ui/utils'
import { usePortfolioStore } from '@/store'
import { useTranslation } from 'react-i18next'

interface IProps {
  className?: string
}

export const DashboardUserBalance: React.FC<IProps> = ({ className }) => {
  const { totalBalance, totalPercentageChange } = usePortfolioStore()

  const { t } = useTranslation()


  const getMarketCapChangeClass = () => {
    if (totalPercentageChange === 0) return 'text-muted'
    return totalPercentageChange < 0 ? 'text-secondary' : 'text-primary'
  }

  return (
    <Card className={'flex py-4 pl-6 pr-9 items-center justify-between rounded-xl border-0'}>
      <CardHeader className={'p-0 space-y-0.5'}>
        <CardTitle className={'text-xs text-muted-foreground'}>{t('dashboard_balance.my_balance')}</CardTitle>
        <CardDescription className={'text-sm text-foreground font-bold'}>
          {totalBalance.toLocaleString().split('.')[0].replace(/,/g, ',')} $
        </CardDescription>
      </CardHeader>
      <CardContent className={'p-0'}>
        <p className={'text-xs text-muted-foreground font-medium text-right'}>{t('dashboard_balance.24h')}</p>
        <p className={cn(getMarketCapChangeClass(), 'text-sm font-semibold transition-colors')}>
          {totalPercentageChange !== null ? totalPercentageChange.toFixed(2) : 'N/A'} %
        </p>
      </CardContent>
    </Card>
  )
}
