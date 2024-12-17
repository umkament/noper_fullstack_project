import s from './avatar.module.scss'

type Props = {
  avatar: string
  className?: string
  size?: number
}
export const Avatar = ({ avatar, className, size = 36 }: Props) => {
  return (
    <div className={s.avatarContainer}>
      <img
        alt={'avatar'}
        className={`${s.avatar} ${className}`}
        height={size}
        src={avatar}
        width={size}
      />
    </div>
  )
}
