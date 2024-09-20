import React from 'react'

interface IProps {
  className?: string
}

export const CryptoTableHeader: React.FC<IProps> = ({ className }) => {
  return (
    <div className={'flex justify-between text-[12.5px] font-medium text-muted-foreground mt-3 mb-4 mr-3.5'}>
      <div className={'flex gap-5'}>
        <div>#</div>
        <div>Coin</div>
      </div>
      <div className={'flex gap-10 mr-5'}>
        <div>Price</div>
        <div>24h %</div>
      </div>
    </div>
)

};
