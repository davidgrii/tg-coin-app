import React from 'react'

interface IProps {
  className?: string
}

export const BalanceTableHeader: React.FC<IProps> = ({ className }) => {
  return (
    <div className={'flex justify-between text-[12.5px] font-medium text-muted-foreground mt-3 mb-4'}>
      <span>
        <div>Coin</div>
      </span>
      <div className={'flex gap-12 mr-9'}>
        <div>Price / 24h</div>
        <div>USD Value</div>
      </div>
    </div>
  );
};
