import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface IProps {
  className?: string
}

export const ChartSkeleton: React.FC<IProps> = ({ className }) => {
  return (
    <Skeleton className="h-[250px] w-full rounded-xl mt-6 bg-muted-foreground/30" />
  )
}
