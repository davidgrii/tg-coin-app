import React from 'react'

interface IProps {
  className?: string
}

export const DetailsCoinsData: React.FC<IProps> = ({ className }) => {
  return (
    <div className={'flex flex-col items-center justify-center w-full mt-4'}>
      <h3 className={'text-xs mb-0.5'}>COINS DATA</h3>

      <div
        className={'bg-accent w-full rounded-xl px-7 py-3.5 text-xs font-medium text-foreground'}
      >

        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>Market Cap</p>
          <p>
            1,338,113,505,849 $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>Fully Diluted Valuation</p>
          <p>
            1,420,809,705,000 $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>24 Hour Trading Vol</p>
          <p>
            40,116,074,054 $
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>Circulation supply</p>
          <p>
            19,777,725
          </p>
        </div>
        <div className={'flex justify-between mb-0.5 border-b border-border/30'}>
          <p>Total Supply</p>
          <p>
            21,000,000
          </p>
        </div>
        <div className={'flex justify-between'}>
          <p>All Time High</p>
          <p>
            78,566 $
          </p>
        </div>
      </div>
    </div>
  )
}
