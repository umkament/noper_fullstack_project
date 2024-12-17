import { ReactNode } from 'react'

import s from './header.module.scss';

type HeaderProps = {
  children: ReactNode
  isSignedIn?: boolean
}
export const Header = ({ children }: HeaderProps) => {
  return <div className={s.header}>{children}</div>
}
