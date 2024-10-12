import React from 'react'
import { formatPrice } from '@/components/utils/utils'
import { cn } from '@/components/ui/utils'
import { useTranslation } from 'react-i18next'

interface IProps {
  notice?: string
  purchasePrice: number
  investedUSD: number
  profitLossUSD: number
  profitLossPercentage: number
}

export const PortfolioItemDetails: React.FC<IProps> = ({notice, purchasePrice, investedUSD, profitLossUSD, profitLossPercentage }) => {

  const { t } = useTranslation()

  return (
    <div className={'w-full text-sm font-medium text-muted-foreground mr-9'}>
      <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
        <p>{t('my_portfolio_page.purchase')}</p>
        <p className={'text-foreground font-bold'}>
          {formatPrice(purchasePrice)} $
        </p>
      </div>
      <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
        <p>{t('my_portfolio_page.invested')}</p>
        <p className={'text-foreground font-bold'}>
          {formatPrice(investedUSD)} $
        </p>
      </div>
      <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
        <p>{t('my_portfolio_page.over_entry')} $</p>
        <p className={cn(profitLossUSD > 0 ? 'text-primary' : 'text-secondary', 'font-bold')}>
          {formatPrice(profitLossUSD)} $
        </p>
      </div>
      <div className={'flex justify-between'}>
        <p>{t('my_portfolio_page.over_entry')} %</p>
        <p className={cn(profitLossPercentage > 0 ? 'text-primary' : 'text-secondary', 'font-bold')}>
          {formatPrice(Number(profitLossPercentage.toFixed(2)))} %
        </p>
      </div>

      {notice &&
        <span className={'bg-accent block w-full text-foreground font-medium rounded-sm mt-2  p-1 pl-2 text-[12px]'}>
          {notice}
        </span>
      }
    </div>
  )
}
