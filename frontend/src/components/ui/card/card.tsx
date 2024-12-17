import React, { ReactNode } from 'react'

import s from './card.module.scss'

export type CardProps = {
  children?: ReactNode
  className?: string
  onClickHandler?: (e: React.MouseEvent<HTMLDivElement>) => void
}
export const Card: React.FC<CardProps> = ({ className, onClickHandler, ...rest }) => {
  return <div className={`${s.card} ${className}`} onClick={onClickHandler} {...rest}></div>
}
