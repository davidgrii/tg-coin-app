import React from 'react'
import { formatPrice } from '@/utils/formatters'
import { ICoinGlobalMarketsData } from '@/types'


interface IProps {
  cryptoMarketsData: ICoinGlobalMarketsData[]
  className?: string
}

export const DetailsMarketsData: React.FC<IProps> = ({ cryptoMarketsData, className }) => {

  return (
    <div className={'flex flex-col items-center justify-center w-full mt-4'}>
      <div className={'flex justify-between items-center w-full text-xs text-muted-foreground font-medium px-6'}>
        <span>Exchanges</span>
        <h3 className={'text-sm mb-0.5 text-foreground'}>MARKETS</h3>
        <span>Volume 24h</span>
      </div>

      <div
        className={'w-full rounded-xl px-5 py-3 text-sm font-medium text-foreground border-[4px] border-chart'}
      >
        {cryptoMarketsData.map((item, index) => (
          <div key={index} className={'flex justify-between mb-1 pb-1 border-b border-border/30'}>
            <p>{item.exchange}</p>
            <p>
              {formatPrice(item.volume_24h)} $
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
