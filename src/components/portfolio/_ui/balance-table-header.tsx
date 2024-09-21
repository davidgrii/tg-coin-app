import React from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  className?: string
}

export const BalanceTableHeader: React.FC<IProps> = ({ className }) => {
  const {t} = useTranslation()
  return (
    <div className={'flex justify-between text-[12.5px] font-medium text-muted-foreground mt-3 mb-4'}>
      <span>
        <div>{t('balance_table_header.coin')}</div>
      </span>
      <div className={'flex gap-12 mr-9'}>
        <div>{t('balance_table_header.price')}</div>
        <div>{t('balance_table_header.value')}</div>
      </div>
    </div>
  );
};
