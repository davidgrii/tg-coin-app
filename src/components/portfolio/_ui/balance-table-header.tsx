import React from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  className?: string
}

export const BalanceTableHeader: React.FC<IProps> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <div className={'flex justify-between text-[12.5px] font-medium text-muted-foreground mt-3 mb-4'}>
      <h2>{t('balance_table_header.coin')}</h2>

      <div className={'flex gap-12 mr-9'}>
        <span>{t('balance_table_header.price')}</span>

        <span className={'w-16 text-right'}>
          {t('balance_table_header.value')}
        </span>
      </div>
    </div>
  )
}
