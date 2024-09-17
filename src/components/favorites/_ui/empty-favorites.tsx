import React from 'react'
import { motion } from 'framer-motion'
import { MarketIcon } from '@/components/icons'

interface IProps {
  isFavoritesEmpty: boolean
  className?: string
}

export const EmptyFavorites: React.FC<IProps> = ({ isFavoritesEmpty, className }) => {
  return (
    <motion.div
      className={'flex flex-col h-[300px] items-center justify-center text-center'}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <p>No coins yet.</p>

      <div className={'flex justify-center gap-3.5 mt-1.5'}>
        Add your first one from the market <MarketIcon />
      </div>
    </motion.div>
  )
}
