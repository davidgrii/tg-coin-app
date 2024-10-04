'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/components/ui/utils'
import { usePortfolioStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/components/utils/utils'

interface IProps {
  className?: string
}

export const DashboardUserBalance: React.FC<IProps> = ({ className }) => {
  const {
    totalBalance,
    totalProfitLoss,
    totalProfitLossPercentage,
    totalPercentageChange24h,
    totalPriceChange24h
  } = usePortfolioStore()

  const { t } = useTranslation()

  const getClassedBasedOnValue = (value: number, isPercentage: boolean = false) => {
    if (value === 0) return 'text-muted'
    return value < 0 ? 'text-secondary' : 'text-primary'
  }

  const formattedBalance = totalBalance.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return (
    <Card className={'py-4 pl-6 pr-9 items-center justify-between rounded-xl border-0'}>
      <CardHeader className={'flex flex-row items-center justify-between p-0 space-y-0 mb-3.5'}>
        <CardTitle className={'text-xs text-muted-foreground'}>
          {t('dashboard_balance.my_balance')}
        </CardTitle>
        <CardDescription className={'text-sm text-foreground font-bold mr-[92px]'}>
          {formattedBalance} $
        </CardDescription>
      </CardHeader>
      <CardContent className={'flex flex-col gap-1 p-0'}>
        <div className={'flex justify-between'}>
          <p className={'text-xs w-24 text-muted-foreground font-medium'}>
            {t('dashboard_balance.24h')}
          </p>

          <div className={'flex gap-3'}>
            <p className={cn(getClassedBasedOnValue(totalPriceChange24h), 'text-sm font-semibold transition-colors')}>
              {formatPrice(totalPriceChange24h)} $
            </p>
            <p
              className={cn(getClassedBasedOnValue(totalPercentageChange24h, true), 'text-sm font-semibold w-20 text-right transition-colors')}>
              {totalPercentageChange24h !== null ? totalPercentageChange24h.toFixed(2) : 'N/A'} %
            </p>
          </div>
        </div>

        <Separator className={'opacity-30'} />

        <div className={'flex justify-between'}>
          <p className={'text-xs w-24 text-muted-foreground font-medium'}>
            {t('dashboard_balance.over_time')}
          </p>

          <div className={'flex gap-3'}>
            <p className={cn(getClassedBasedOnValue(totalProfitLoss),
              'text-sm font-semibold transition-colors')}
            >
              {formatPrice(totalProfitLoss)} $
            </p>
            <p
              className={cn(getClassedBasedOnValue(totalProfitLossPercentage, true),
                'text-sm font-semibold w-20 text-right transition-colors')}
            >
              {totalProfitLossPercentage !== null ? totalProfitLossPercentage.toFixed(2) : 'N/A'} %
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
