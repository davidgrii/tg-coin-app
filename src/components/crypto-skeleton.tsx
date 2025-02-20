import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/components/ui/utils'

interface IProps {
  className?: string
}

export const CryptoSkeleton: React.FC<IProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center space-x-3", className)}>
      <Skeleton className="h-[40px] w-[40px] rounded-full" />

      <div className={'flex flex-col gap-1'}>
        <Skeleton className="h-3 w-[210px] rounded-[2px]" />
        <Skeleton className="h-2 w-[110px] rounded-[2px]" />
      </div>

    </div>
  )
}
