import React from 'react'
import { cn } from '@/components/ui/utils'

interface IProps {
    children?: React.ReactNode
    className?: string
}

export const Container: React.FC<IProps> = ({ className, children }) => {
    return (
        <div className={cn('mx-auto max-w-3xl p-3.5', className)}>
            {children}
        </div>
    )
}
