import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/components/ui/utils'
import { SpinnerIcon } from '@/components/icons/icons'

interface IProps {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  className?: string
}

export const LoadMoreIndicator: React.FC<IProps> = ({ hasNextPage, isFetchingNextPage, className }) => {

  if (hasNextPage && !isFetchingNextPage) return null

  return (
    <motion.div
      className={cn(className, '')}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!hasNextPage ? (
        <div className={'flex justify-center gap-2 items-center'}>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#007AFF]"></span>
          </span>

          <span className={'text-sm'}>No more data...</span>
        </div>
      ) : (
        !isFetchingNextPage &&
        <div className={'flex justify-center gap-2 items-center'}>
          <SpinnerIcon
            width={25}
            height={25}
          />

          <span className={'text-sm'}>Loading crypto...</span>
        </div>
      )}
    </motion.div>
  )
}
