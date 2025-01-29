import { cn } from '@/lib/utils';
import React from 'react'

export const Topbar = ({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string
}) => {
    return (
        <div className={cn('flex items-center gap-6 w-full h-20 border-b px-4 text-3xl font-bold text-muted-foreground', className)}>
            {children}
        </div>
    )
}