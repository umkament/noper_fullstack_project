import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { Typography } from '@/components/ui/typography'
import { FaXmark } from 'react-icons/fa6'
import { FcSearch } from 'react-icons/fc'
import { PiEyeClosedDuotone, PiEyeDuotone } from 'react-icons/pi'

import s from './input.module.scss'

import { Button } from '../button'

export type InputProps = {
  className?: string
  disabled?: boolean
  errorMessage?: string
  inputIcon?: string
  label?: string
  onChangeValue?: (value: string) => void
  onClearClick?: () => void
  onEnter?: () => void
  placeholder?: string
  value?: string
} & ComponentPropsWithoutRef<'input'>

const getType = (type: string, showPassword: boolean) => {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled,
      errorMessage,
      label,
      onChangeValue,
      onClearClick,
      onEnter,
      placeholder,
      type = 'text',
      value,
      ...restProps
    },
    ref
  ) => {
    const isError = errorMessage ? s.error : ''

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeValue?.(e.currentTarget.value)
    }
    // @ts-ignore
    const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      onEnter && e.key === 'Enter' && onEnter()
    }

    const cleanTextHandler = () => {
      onClearClick?.()
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className={className}>
        <Typography as={'label'} className={s.label} variant={'body2'}>
          {label}
        </Typography>
        <div className={s.inputWrapper}>
          {type === 'search' ? <FcSearch className={s.searchIcon} /> : null}
          {type === 'password' && (
            <Button
              className={s.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              type={'button'}
              variant={'link'}
            >
              {showPassword ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
            </Button>
          )}
          {type === 'search' && value && (
            <button className={s.xMarkIcon} onClick={cleanTextHandler} type={'button'}>
              <FaXmark />
            </button>
          )}
          <input
            className={isError ? isError : s.default}
            disabled={disabled}
            onChange={onChangeValueHandler}
            onKeyDown={onPressEnterHandler}
            placeholder={placeholder}
            ref={ref}
            type={getType(type, showPassword)}
            value={value}
            {...restProps}
          />
        </div>
        {errorMessage ? <div className={s.errorMessage}>{errorMessage}</div> : null}
      </div>
    )
  }
)
