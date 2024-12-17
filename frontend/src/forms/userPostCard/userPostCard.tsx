import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import postImg from '@/assets/userPhoto.jpeg'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useAuthMeQuery } from '@/services/auth'
import { useGetPostLikeQuery, useTogglePostLikeMutation } from '@/services/posts'
import { PostInterface } from '@/services/posts/posts.type'
import { BsBalloonHeartFill } from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa6'
import { PiHandHeartLight } from 'react-icons/pi'

import s from './userPostCard.module.scss'

type UserPostCardProps = {
  post: PostInterface
}

export const UserPostCard: React.FC<UserPostCardProps> = ({ post }) => {
  const navigate = useNavigate()
  const skipQuery = !post._id
  const { data: likesData } = useGetPostLikeQuery(
    { postId: post._id! },
    { skip: skipQuery }
  )
  const [toggleLike] = useTogglePostLikeMutation()
  const { data: user } = useAuthMeQuery()

  const handleToggleLike = async () => {
    try {
      await toggleLike({ postId: post._id! }).unwrap()
    } catch (error) {
      console.error('Ошибка при изменении лайка:', error)
    }
  }

  const handlePostClick = () => {
    if (!user) {
      // Если пользователь не авторизован, перенаправляем на страницу авторизации
      navigate('/auth/login')
    } else {
      // Если пользователь авторизован, переходим на страницу поста
      navigate(`/post/${post._id}`)
    }
  }
  const avatarImage =
    post?.user.avatarUrl && post.user.avatarUrl.startsWith('/uploads/')
      ? `http://51.250.51.234:4411${post.user.avatarUrl}` // Если путь относительный и начинается с /uploads/
      : post.user.avatarUrl || `https://robohash.org/${post.user.username}.png`
  const postImage =
    post?.imageUrl && post.imageUrl.startsWith('/uploads/')
      ? `http://51.250.51.234:4411${post.imageUrl}`
      : post.imageUrl || postImg

  return (
    <Card className={s.card}>
      <Link className={s.linkoff} onClick={handlePostClick} to={'#'}>
        <img alt={'user_photo'} className={s.cardImg} src={postImage} />
      </Link>
      <div className={s.textWrap}>
        <div className={s.avaName}>
          <Button as={Link} to={`/user/${post.user._id}`} variant={'icon'}>
            <Avatar avatar={avatarImage} />
          </Button>
          <Typography className={s.userName} variant={'h3'}>
            {post.user.username}
          </Typography>
        </div>
        <Typography className={s.title} variant={'h2'}>
          {post.title}
        </Typography>

        <div className={s.wrapinfo}>
          <Typography className={s.date}>
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
          <div className={s.whatcher}>
            <Typography className={s.centerview}>
              <span className={s.viewsCount}>{post.viewsCount}</span>
              <FaRegEye className={s.eyeIcon} size={20} />
            </Typography>
            <Button className={s.favorite} onClick={handleToggleLike} variant={'icon'}>
              {likesData?.likedByUser ? (
                <BsBalloonHeartFill size={22} />
              ) : (
                <PiHandHeartLight size={22} />
              )}
              {likesData?.likesCount}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
