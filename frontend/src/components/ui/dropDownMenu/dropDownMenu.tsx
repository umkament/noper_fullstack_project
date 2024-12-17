import React, { ReactNode } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'

import s from './dropDownMenu.module.scss'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
}
const motionItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

export type DropDownMenuProps = {
  aline?: 'center' | 'end' | 'start'
  children?: ReactNode
  isMenuOpen?: boolean
  onChange?: (open: boolean) => void
  trigger?: ReactNode
}
export const DropDownMenu: React.FC<DropDownMenuProps> = ({
  aline,
  children,
  isMenuOpen,
  onChange,
  trigger,
}) => {
  return (
    <DropdownMenuRadix.Root onOpenChange={onChange} open={isMenuOpen}>
      <DropdownMenuRadix.Trigger asChild>
        <button aria-label={'custom menu'} className={s.buttonTrigger}>
          {trigger}
        </button>
      </DropdownMenuRadix.Trigger>

      <DropdownMenuRadix.Portal>
        <DropdownMenuRadix.Content align={aline} className={s.contentWrapper} sideOffset={12}>
          <motion.div
            animate={'visible'}
            className={s.content}
            initial={'hidden'}
            variants={container}
          >
            {children}
          </motion.div>
          <DropdownMenuRadix.Arrow asChild className={s.arrowWrapper}>
            <div className={s.arrow} />
          </DropdownMenuRadix.Arrow>
        </DropdownMenuRadix.Content>
      </DropdownMenuRadix.Portal>
    </DropdownMenuRadix.Root>
  )
}

type DropDownItemProps = {
  children?: ReactNode
}
export const DropDownItem = ({ children }: DropDownItemProps) => {
  return (
    <>
      <motion.div variants={motionItem}>
        <DropdownMenuRadix.Item className={s.item}>{children}</DropdownMenuRadix.Item>
      </motion.div>
      <DropdownMenuRadix.Separator className={s.separator} />
    </>
  )
}
