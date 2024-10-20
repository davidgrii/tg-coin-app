import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface IProps {
  isProfileEmpty: boolean
  className?: string
}

export const EmptyProfile: React.FC<IProps> = ({ isProfileEmpty, className }) => {
  const { t } = useTranslation()

  if (isProfileEmpty) {
    return (
      <motion.div
        className={'flex flex-col h-[300px] items-center text-sm justify-center text-center'}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p>{('empty_favorites.no_coins')}</p>

        <div className={'flex justify-center gap-1.5 mt-0.5 items-center flex-wrap max-w-60'}>
          {('empty_favorites.add_first')}
        </div>
      </motion.div>
    )
  }
  return

}
