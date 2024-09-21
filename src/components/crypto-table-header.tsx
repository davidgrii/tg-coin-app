import React from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  className?: string
}

export const CryptoTableHeader: React.FC<IProps> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <div className={`flex justify-between text-[12.5px] font-medium text-muted-foreground mt-3 mb-4 mr-3.5 ${className}`}>
      <div className="flex gap-5">
        <div>{t('table_header.rank')}</div>
        <div>{t('table_header.coin')}</div>
      </div>
      <div className="flex gap-8 mr-6">
        <div>{t('table_header.price')}</div>
        <div className={'w-12 text-right'}>{t('table_header.change')}</div>
      </div>
    </div>
  );
};
