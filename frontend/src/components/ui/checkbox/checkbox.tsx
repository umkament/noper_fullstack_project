import React, { ComponentPropsWithoutRef } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { PiCheckFatDuotone } from 'react-icons/pi'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  label?: string
  onCheckedHandler?: (checked: boolean) => void
} & ComponentPropsWithoutRef<typeof Checkbox.Root>

export const CheckboxComponent: React.FC<CheckboxProps> = ({
  checked,
  className,
  disabled,
  label,
  onCheckedHandler,
}) => {
  return (
    <div className={`${s.wrapper} ${className}`}>
      <div className={`${s.checkboxWrapper} ${disabled ? s.disabled : ''}`}>
        <Checkbox.Root
          checked={checked}
          className={s.checkbox}
          disabled={disabled}
          id={'ch1'}
          onCheckedChange={onCheckedHandler}
        >
          <Checkbox.Indicator className={s.indicator}>
            <PiCheckFatDuotone className={s.icon} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label className={s.label} htmlFor={'ch1'}>
        {label}
      </label>
    </div>
  )
}
