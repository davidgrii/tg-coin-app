import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SortedPortfolioIcon } from '@/components/icons/icons'
import { usePortfolioStore } from '@/store'

interface IProps {
  className?: string
}

export const BalanceTableHeader: React.FC<IProps> = ({ className }) => {
  const { t } = useTranslation()
  const { sortOrder, sortPortfolio } = usePortfolioStore()

  const toggleSortDirection = () => {
    const newDirection = sortOrder === 'asc' ? 'desc' : 'asc'
    sortPortfolio(newDirection)
  }

  return (
    <div className={'flex justify-between text-[12.5px] font-medium text-muted-foreground mt-3'}>
      <h2>{t('balance_table_header.coin')}</h2>

      <div className={'flex'}>
        <div className={'flex gap-8 mr-5'}>
          <span>
            {t('balance_table_header.price')}
          </span>
          <span className={'w-20 text-right'}>
            {t('balance_table_header.value')}
          </span>
        </div>

        <motion.span
          className="cursor-pointer flex items-center"
          initial={{ rotate: 0 }}
          animate={{ rotate: sortOrder === 'desc' ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          onClick={toggleSortDirection}
        >
          <SortedPortfolioIcon />
        </motion.span>
      </div>
    </div>
  )
}
