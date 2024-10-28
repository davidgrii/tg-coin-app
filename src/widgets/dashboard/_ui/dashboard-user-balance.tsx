'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/components/ui/utils'
import { usePortfolioStore } from '@/store'
import { useTranslation } from 'react-i18next'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/components/utils/utils'
import { motion } from 'framer-motion'

export const DashboardUserBalance: React.FC<IProps> = ({ className }) => {
  const {
    portfolio,
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
    <>
      {portfolio.length > 0 ?
        <Card className={'py-4 pl-6 pr-9 items-center justify-between rounded-xl border-0'}>
          <CardHeader className={'flex flex-row items-center justify-between p-0 space-y-0 mb-3.5'}>
            <CardTitle className={'text-sm text-muted-foreground font-bold'}>
              {t('dashboard_balance.my_balance')}
            </CardTitle>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1 }}
            >
              <CardDescription className={'text-sm text-foreground font-bold mr-[85px]'}>
                {formattedBalance} $
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className={'flex flex-col gap-1 p-0'}>
            <div className={'flex justify-between items-end'}>
              <p className={'text-xs w-24 text-muted-foreground font-medium'}>
                {t('dashboard_balance.24h')}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
                className={'flex gap-1.5'}
              >
                <p className={cn(getClassedBasedOnValue(totalPriceChange24h), 'text-sm font-semibold transition-colors')}>
                  {formatPrice(Number(totalPriceChange24h.toFixed(2)))} $
                </p>
                <p
                  className={cn(getClassedBasedOnValue(totalPercentageChange24h, true), 'text-sm font-semibold w-20 text-right transition-colors')}>
                  {totalPercentageChange24h !== null ? totalPercentageChange24h.toFixed(2) : 'N/A'} %
                </p>
              </motion.div>
            </div>

            <Separator className={'opacity-30'} />

            <div className={'flex justify-between items-end'}>
              <p className={'text-xs w-24 text-muted-foreground font-medium text-nowrap'}>
                {t('dashboard_balance.over_time')}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
                className={'flex gap-1.5'}
              >
                <p className={cn(getClassedBasedOnValue(totalProfitLoss),
                  'text-sm font-semibold transition-colors')}
                >
                  {formatPrice(Number(totalProfitLoss.toFixed(2)))} $
                </p>
                <p
                  className={cn(getClassedBasedOnValue(totalProfitLossPercentage, true),
                    'text-sm font-semibold w-20 text-right transition-colors')}
                >
                  {totalProfitLossPercentage !== null ? totalProfitLossPercentage.toFixed(2) : 'N/A'} %
                </p>
              </motion.div>

            </div>
          </CardContent>
        </Card>

        : <Card className={'py-4 pl-6 pr-9 items-center justify-between rounded-xl border-0'}>
          <CardHeader className={'flex flex-row items-center justify-between p-0 space-y-0 mb-3.5'}>
            <CardTitle className={'text-sm text-muted-foreground font-bold'}>
              {t('dashboard_balance.my_balance')}
            </CardTitle>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.1 }}
            >
              <CardDescription className={'text-sm text-foreground font-bold mr-[85px]'}>
                122,467 $
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className={'flex flex-col gap-1 p-0'}>
            <div className={'flex justify-between items-end'}>
              <p className={'text-xs w-24 text-muted-foreground font-medium'}>
                {t('dashboard_balance.24h')}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
                className={'flex gap-1.5'}
              >
                <p className={'text-sm text-secondary font-semibold transition-colors'}>
                  -3,323 $
                </p>
                <p
                  className={'text-sm font-semibold w-20 text-right transition-colors text-secondary'}>
                  -0.92 %
                </p>
              </motion.div>
            </div>

            <Separator className={'opacity-30'} />

            <div className={'flex justify-between items-end'}>
              <p className={'text-xs w-24 text-muted-foreground font-medium text-nowrap'}>
                {t('dashboard_balance.over_time')}
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
                className={'flex gap-1.5'}
              >
                <p className={'text-sm font-semibold transition-colors text-primary'}>
                  76,572 $
                </p>
                <p className={'text-sm text-primary font-semibold w-20 text-right transition-colors'}>
                  87%
                </p>
              </motion.div>

            </div>
          </CardContent>
        </Card>
      }

    </>
  )
}

interface IProps {
  className?: string
}
