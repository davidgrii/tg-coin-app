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
        className={'flex flex-col  items-center text-sm justify-center text-center'}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className={'mb-3 mt-4'}>{t('empty_profile.no_invited')}</p>

        <div className={'flex justify-center text-muted-foreground font-medium gap-1.5 mt-0.5 items-center flex-wrap max-w-80 mb-3'}>
          {t('empty_profile.start_inviting')}
        </div>

        <div className={'flex justify-center gap-1.5 mt-0.5 items-center flex-wrap max-w-60'}>
          {t('empty_profile.share')}
        </div>
      </motion.div>
    )
  }
  return

}
