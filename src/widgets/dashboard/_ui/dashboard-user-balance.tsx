'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/components/ui/utils'
import { usePortfolioStore } from '@/store'

interface IProps {
  className?: string
}

export const DashboardUserBalance: React.FC<IProps> = ({ className }) => {
  const { totalBalance, totalPercentageChange } = usePortfolioStore()

  const getMarketCapChangeClass = () => {
    if (totalPercentageChange === 0) return 'text-muted'
    return totalPercentageChange < 0 ? 'text-secondary' : 'text-primary'
  }

  // Функция для форматирования чисел с запятыми
  const formatNumberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Card className={'flex py-4 pl-6 pr-9 items-center justify-between rounded-xl border-0'}>
      <CardHeader className={'p-0 space-y-0.5'}>
        <CardTitle className={'text-xs text-muted-foreground'}>My balance</CardTitle>
        <CardDescription className={'text-sm text-foreground font-bold'}>
          {formatNumberWithCommas(totalBalance)} $
        </CardDescription>
      </CardHeader>
      <CardContent className={'p-0'}>
        <p className={'text-xs text-muted-foreground font-medium text-right'}>24h</p>
        <p className={cn(getMarketCapChangeClass(), 'text-sm font-semibold transition-colors')}>
          {totalPercentageChange !== null ? totalPercentageChange.toFixed(2) : 'N/A'} %
        </p>
      </CardContent>
    </Card>
  )
}
