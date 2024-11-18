import React from 'react'
import { formatPrice } from '@/utils/formatters'
import { IMarketsCoinData } from '@/types'

interface IProps {
  cryptoMarketCoinData: IMarketsCoinData
  className?: string
}

export const DetailsCoinsData: React.FC<IProps> = ({ cryptoMarketCoinData, className }) => {
  return (
    <div className={'flex flex-col items-center justify-center w-full mt-4'}>
      <h3 className={'text-sm mb-0.5'}>COINS DATA</h3>

      <div
        className={'bg-accent w-full rounded-xl px-6 py-3.5 text-sm font-medium text-foreground'}
      >

        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>Market Cap</p>
          <p>
            {formatPrice(cryptoMarketCoinData.market_cap)} $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>FD Valuation</p>
          <p>
            {formatPrice(cryptoMarketCoinData.fdv)} $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>24H Volume</p>
          <p>
            {formatPrice(cryptoMarketCoinData.volume_24h)} $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>Circulation supply</p>
          <p>
            {formatPrice(cryptoMarketCoinData.circulating_supply)} $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>Total Supply</p>
          <p>
            {formatPrice(cryptoMarketCoinData.total_supply)} $
          </p>
        </div>
        <div className={'flex justify-between'}>
          <p>All Time High</p>
          <p>
            {formatPrice(cryptoMarketCoinData.all_time_high)} $
          </p>
        </div>
      </div>
    </div>
  )
}
