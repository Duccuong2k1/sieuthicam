import { cn } from '@/libs/utils'
import React from 'react'

type TitleWrapperProps = {
  label: string
  content?: string | React.ReactNode
  className?: string
  classNameContent?: string
  classNameLabel?: string
}

export function TitleContentRow({
  label,
  content,
  className = '',
  classNameContent = '',
  classNameLabel = '',
}: TitleWrapperProps) {
  return (
    <div className={cn('flex flex-row items-center gap-2', className)}>
      <span className={cn('font-bold', classNameLabel)}>{label}:</span>
      <span className={cn(classNameContent)}>{content}</span>
    </div>
  )
}
