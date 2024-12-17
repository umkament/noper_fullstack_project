import { ChangeEvent, ComponentPropsWithoutRef, forwardRef } from 'react'

import { Typography } from '@/components/ui/typography'

import s from './textarea.module.scss'

export type TextareaProps = {
  className?: string
  disabled?: boolean
  errorMessage?: string
  label?: string
  onChangeValue?: (value: string) => void
  onClearClick?: () => void
  onEnter?: () => void
  placeholder?: string
  textAreaIcon?: string
  value?: string
} & ComponentPropsWithoutRef<'textarea'>

const getType = (type: string, showPassword: boolean) => {
  if (type === 'password' && showPassword) {
    return 'text'
  }
  console.log(getType('123', true))

  return type
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
      // type = 'text',
      value,
      ...restProps
    },
    ref
  ) => {
    const isError = errorMessage ? s.error : ''

    const onChangeValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChangeValue?.(e.currentTarget.value)
    }
    // @ts-ignore
    const onPressEnterHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      onEnter && e.key === 'Enter' && onEnter()
    }

    // const cleanTextHandler = () => {
    //   onClearClick?.()
    // }

    // const [showPassword, setShowPassword] = useState(false)

    return (
      <div className={className}>
        <Typography as={'label'} className={s.label} variant={'body2'}>
          {label}
        </Typography>
        <div className={s.textareaWrapper}>
          {/* {type === 'search' ? <FcSearch className={s.searchIcon} /> : null}
          {type === 'password' && (
            <Button
              className={s.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
              type={'button'}
              variant={'link'}
            >
              {showPassword ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
            </Button>
          )} */}
          {/* {value && (
            <button className={s.xMarkIcon} onClick={cleanTextHandler} type={'button'}>
              <FaXmark />
            </button>
          )} */}
          <textarea
            className={isError ? isError : s.default}
            disabled={disabled}
            onChange={onChangeValueHandler}
            onKeyDown={onPressEnterHandler}
            placeholder={placeholder}
            ref={ref}
            //type={getType(type, showPassword)}
            value={value}
            {...restProps}
          />
        </div>
        {errorMessage ? <div className={s.errorMessage}>{errorMessage}</div> : null}
      </div>
    )
  }
)
