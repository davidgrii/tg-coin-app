import React from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  className?: string
}

export const FavoritesTableHeader: React.FC<IProps> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <div className={`flex justify-between text-[12.5px] font-medium text-muted-foreground mt-3 mb-4 mr-3.5 ${className}`}>
      <div className="flex gap-5">
        <span>{t('table_header.rank')}</span>
        <span>{t('table_header.coin')}</span>
      </div>

      <div className="flex gap-8 mr-6">
        <span>{t('table_header.price')}</span>

        <span className={'w-12 text-right'}>
          {t('table_header.change')}
        </span>
      </div>
    </div>
  );
};