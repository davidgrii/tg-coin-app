import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface IProps {
  className?: string
}

export const CryptoSkeleton: React.FC<IProps> = ({ className }) => {
  return (
    <div className="flex items-center justify-center space-x-3">
      <Skeleton className="h-[40px] w-[40px] rounded-full" />

      <Skeleton className="h-7 w-[230px] rounded" />

    </div>
  )
}
