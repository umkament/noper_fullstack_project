import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import postImg from '@/assets/userPhoto.jpeg'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useAuthMeQuery } from '@/services/auth'
import { PostInterface } from '@/services/posts'
import { UserInterface, useGetUserPostsQuery, useGetUserQuery } from '@/services/users'
import { BsBookmarksFill } from 'react-icons/bs'
import { PiDotsThreeCircle } from 'react-icons/pi'
import { SiReaddotcv } from 'react-icons/si'

import s from './user-page.module.scss'

export const UserPage = () => {
  const { userId } = useParams<{ userId: string }>()

  const { data: user, error: userError, isLoading: isUserLoading } = useGetUserQuery(userId || '')

  const {
    data: responceData,
    error: postsError,
    isLoading: isPostsLoading,
    refetch,
  } = useGetUserPostsQuery(userId || '')

  const posts = Array.isArray(responceData) ? responceData : responceData?.posts || []

  if (!userId) {
    return <div>Error: User ID is missing</div>
  }

  if (isUserLoading || isPostsLoading) {
    return <div>Loading...</div>
  }

  if (userError) {
    return <div>Error: {JSON.stringify(userError)}</div>
  }
  if (postsError) {
    return <div>Error: {JSON.stringify(postsError)}</div>
  }

  return user ? (
    <UserPageContent posts={posts || []} refetch={refetch} user={user} userId={userId} />
  ) : (
    <Typography variant={'h2'}>User not found</Typography>
  )
}

interface UserProps {
  posts: PostInterface[]
  refetch: () => void
  user: UserInterface
  userId: string
}

export const UserPageContent: React.FC<UserProps> = ({ posts, user, userId }) => {
  const navigate = useNavigate()
  const postsBlockClass = posts.length === 0 ? `${s.postsBlock} ${s.empty}` : s.postsBlock

  const { data: currentUser } = useAuthMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !userId,
  })
  const handlePostClick = (postId: string) => {
    if (!currentUser) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      navigate('/auth/login')
    } else {
      // Если пользователь авторизован, переходим на страницу поста
      navigate(`/post/${postId}`)
    }
  }

  console.log('currentUser from useAuthMeQuery:', currentUser)

  const isCurrentUser = currentUser?._id === userId

  console.log('isCurrentUser:', isCurrentUser)
  console.log('avatarUrl:', user.avatarUrl)

  return (
    <div className={s.mainContainer}>
      <div className={s.infoBlock}>
        <div className={s.imgWrap}>
          <img
            alt={'postImg'}
            className={s.imgStyle}
            src={
              user?.avatarUrl && user.avatarUrl.startsWith('/uploads/')
                ? `http://51.250.51.234:4411${user.avatarUrl}` // Если путь относительный и начинается с /uploads/
                : user?.avatarUrl || `https://robohash.org/${user?.username}.png` // Если URL полный или не задан
            }
          />
        </div>
        <div className={s.textInfo}>
          <Typography className={s.username} variant={'caption'}>
            @{user.username}
          </Typography>
          <Typography className={s.name}>{`${user.name} ${user.surname}`}</Typography>
          <Typography
            className={`${s.description} ${!user.description ? s.empty : ''}`}
            variant={'body1'}
          >
            {user.description}
          </Typography>
          <Typography as={Link} className={s.link} to={`${user.link}`} variant={'link1'}>
            {user.link}
          </Typography>
        </div>
      </div>
      {isCurrentUser && (
        <div>
          <Button as={Link} to={'/add-post'}>
            <Typography className={s.btntext}>добавить статью</Typography>
            <SiReaddotcv size={22} />
            {/* <GrTextWrap size={22} /> */}
          </Button>
          <Button as={Link} to={'/saved'}>
            <Typography className={s.btntext}>сохраненное</Typography>
            <BsBookmarksFill size={22} />
          </Button>
          <Button as={Link} to={`/edit-profile`}>
            <Typography className={s.btntext}>редактировать</Typography>
            <PiDotsThreeCircle size={22} />
          </Button>
        </div>
      )}

      <div className={postsBlockClass}>
        {posts && posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} onClick={() => handlePostClick(post._id)}>
              <img
                alt={post.title}
                className={s.postImg}
                key={post._id}
                src={
                  post?.imageUrl && post.imageUrl.startsWith('/uploads/')
                    ? `http://51.250.51.234:4411${post.imageUrl}` // Если путь относительный и начинается с /uploads/
                    : post.imageUrl || postImg
                }
              />
            </div>
          ))
        ) : (
          <Typography className={s.text} variant={'h3'}>
            пока нет опубликованных статей
          </Typography>
        )}
      </div>
    </div>
  )
}
