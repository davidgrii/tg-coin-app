import React from 'react'
import { CryptoChart } from '@/components/crypto-chart'
import { IChartCoinData } from '@/types'

interface IProps {
  chartCoinData: IChartCoinData
  className?: string
}

export const DetailsCryptoChart: React.FC<IProps> = ({ chartCoinData, className }) => {
  return (
    <div className={'flex flex-col items-center mt-4'}>
      <h3 className={'text-sm mb-0.5'}>CHART</h3>

      <CryptoChart chartData={chartCoinData}/>

    </div>
  )
}
