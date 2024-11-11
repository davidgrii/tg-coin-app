import React from 'react'

interface IProps {
  className?: string
}

export const DetailsCryptoChart: React.FC<IProps> = ({ className }) => {
  return (
    <div className={'flex flex-col items-center mt-4'}>
      <h3 className={'text-sm mb-0.5'}>CHART</h3>

      <div className={'flex flex-col justify-end w-full h-52 border-[4px] border-chart rounded-xl relative'}>
        <div className={'border-chart border w-[90%] mx-auto px-5'}>

        </div>

        <div className={'flex justify-between text-sm border-chart  mx-7 py-1.5'}>
          <div className={'flex gap-3.5 font-medium text-muted-foreground'}>
            <span>1D</span>
            <span>7D</span>
            <span>1M</span>
          </div>

          <span>14%</span>
        </div>
      </div>
    </div>
  )
}
