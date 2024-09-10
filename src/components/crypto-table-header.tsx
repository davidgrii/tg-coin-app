import React from 'react'

interface IProps {
  className?: string
}

export const CryptoTableHeader: React.FC<IProps> = ({ className }) => {
  return (
    <div className={'flex justify-between text-sm font-medium text-muted-foreground mt-3 mb-4'}>
      <div className={'flex gap-5'}>
        <div>#</div>
        <div>Coin</div>
      </div>
      <div className={'flex gap-9 mr-10'}>
        <div>Price</div>
        <div>24h %</div>
      </div>
    </div>
  );
};
