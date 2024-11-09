import React from 'react'

interface IProps {
  className?: string
}

export const DetailsMarketsData: React.FC<IProps> = ({ className }) => {
  return (
    <div className={'flex flex-col items-center justify-center w-full mt-4'}>
      <div className={'flex justify-between items-center w-full text-[10px] text-muted-foreground font-medium px-7'}>
        <span>Exchanges</span>
        <h3 className={'text-xs mb-0.5 text-foreground'}>MARKETS</h3>
        <span>Volume 24h</span>
      </div>

      <div
        className={'w-full rounded-xl px-6 py-3 text-xs font-medium text-foreground border-[4px] border-chart'}
      >

        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>Binance</p>
          <p>
            1,338,113,505,849 $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>Bybit</p>
          <p>
            21,809,705,000 $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>WhiteBit</p>
          <p>
            1,809,705,000 $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>Okx</p>
          <p>
            1,609,705,000 $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>Kucoin</p>
          <p>
            1,409,705,000 $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>BitGet</p>
          <p>
            1,309,705,000 $
          </p>
        </div>
        <div className={'flex justify-between'}>
          <p>BitStamp</p>
          <p>
            1,209,705,000 $
          </p>
        </div>
      </div>
    </div>
  )
}
