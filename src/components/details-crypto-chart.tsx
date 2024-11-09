import React from 'react'

interface IProps {
  className?: string
}

export const DetailsCryptoChart: React.FC<IProps> = ({ className }) => {
  return (
    <div className={'flex flex-col items-center mt-4'}>
      <h3 className={'text-xs mb-0.5'}>CHART</h3>

      <div className={'flex justify-center w-full h-52 border-[4px] border-chart rounded-xl relative'}>


        <div className={'absolute flex justify-between text-xs bottom-6 border-chart border-t w-full'}>
          <div>
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
