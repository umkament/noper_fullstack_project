import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { SaveButton } from '@/components/ui/saveButton'
import { Typography } from '@/components/ui/typography'
import { UserInterface, useGetUserLikeQuery, useToggleUserLikeMutation } from '@/services/users'
import { BsBalloonHeartFill } from 'react-icons/bs'
import { PiHandHeartLight } from 'react-icons/pi'

import s from './userCard.module.scss'

type UserPostCardProps = {
  user: UserInterface
}

export const UserCard: React.FC<UserPostCardProps> = ({ user }) => {
  const skipQuery = !user._id
  const { data: likesData } = useGetUserLikeQuery({ userId: user._id! }, { skip: skipQuery })
  const [toggleLike] = useToggleUserLikeMutation()

  const handleToggleLike = async (event: React.MouseEvent) => {
    event?.stopPropagation()
    console.log('Клик на кнопке лайка')
    try {
      await toggleLike({ userId: user._id! }).unwrap()
    } catch (error) {
      console.error('Ошибка при изменении лайка:', error)
    }
  }

  return (
    <div className={s.buttonWrap}>
      <Link className={s.imageWrap} to={`/user/${user._id}`}>
        <img
          className={s.imgprof}
          src={
            user?.avatarUrl && user.avatarUrl.startsWith('/uploads/')
              ? `http://51.250.51.234:4411${user.avatarUrl}` // Если путь относительный и начинается с /uploads/
              : user?.avatarUrl || `https://robohash.org/${user?.username}.png` // Если URL полный или не задан
          }
        />
      </Link>
      <div className={s.textContent}>
        <Link className={s.linkOff} to={`/user/${user._id}`}>
          <Typography className={s.userName} variant={'h3'}>
            @{user.username}
          </Typography>
          <Typography className={s.name} variant={'subtitle1'}>
            {`${user.name} ${user.surname}`}
          </Typography>
        </Link>
        <div className={s.smllbtns}>
          <Typography className={s.saved}>
            <SaveButton itemId={user._id} type={'user'} />
          </Typography>

          <Button className={s.favorite} onClick={handleToggleLike} variant={'icon'}>
            {likesData?.likedByUser ? (
              <BsBalloonHeartFill size={20} />
            ) : (
              <PiHandHeartLight size={21} />
            )}
            {likesData?.likesCount}
          </Button>
        </div>
      </div>
    </div>
  )
}
