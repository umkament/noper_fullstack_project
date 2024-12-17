import React from 'react'
import { Link } from 'react-router-dom'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useGetPostsQuery } from '@/services/posts'
import { Saved, useGetSavedQuery, useToggleSavedMutation } from '@/services/saved'
import { useGetUsersQuery } from '@/services/users'
import { AiTwotoneDelete } from 'react-icons/ai'

import s from './saved-page.module.scss'

export const SavedPage: React.FC = () => {
  const { data: savedData, error, isLoading, refetch } = useGetSavedQuery()
  const [toggleSaved, { isLoading: isToggling }] = useToggleSavedMutation()
  const { data: usersData, isFetching: isUsersLoading } = useGetUsersQuery()
  const { data: postsData } = useGetPostsQuery()

  // Обрабатываем сохраненных пользователей
  const savedUsers = (savedData || []).filter((item: Saved) => item.type === 'user')
  const savedPosts = (savedData || []).filter((item: Saved) => item.type === 'post')

  // Мапим сохраненных пользователей с их данными
  const usersWithDetails = savedUsers.map(savedUser => ({
    ...savedUser,
    userDetails: usersData?.find(user => user._id === savedUser.itemId),
  }))

  const postsWithDetails = savedPosts.map(savedPost => ({
    ...savedPost,
    postDetails: postsData?.find(post => post._id === savedPost.itemId),
  }))

  const handleToggleSaved = async (itemId: string, type: 'post' | 'user') => {
    await toggleSaved({ itemId, type })
    refetch()
  }

  if (isLoading || isUsersLoading) {
    return <p>Загрузка...</p>
  }

  if (error) {
    return <p>Ошибка загрузки: {(error as any).message}</p>
  }

  return (
    <div className={s.savedPage}>
      <div className={s.savedUsers}>
        <Typography className={s.title} variant={'h2'}>
          Сохраненные пользователи
        </Typography>
        {savedUsers.length > 0 ? (
          <ul>
            {usersWithDetails.map(({ itemId, userDetails }) => (
              <li className={s.userItem} key={itemId}>
                <div className={s.userInfo}>
                  {userDetails ? (
                    <Button as={Link} to={`/user/${userDetails._id}`}>
                      <Avatar
                        avatar={
                          userDetails?.avatarUrl
                            ? `http://51.250.51.234:4411${userDetails.avatarUrl}`
                            : `https://robohash.org/${userDetails?.username}.png`
                        }
                      />
                      {userDetails.username}
                    </Button>
                  ) : (
                    <p>Данные пользователя недоступны</p>
                  )}
                </div>
                <Button
                  className={s.toggleBtn}
                  disabled={isToggling}
                  onClick={() => handleToggleSaved(itemId, 'user')}
                >
                  <AiTwotoneDelete />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет сохраненных пользователей.</p>
        )}
      </div>

      <div className={s.savedPosts}>
        <Typography className={s.title} variant={'h2'}>
          Сохраненные посты
        </Typography>
        {savedPosts.length > 0 ? (
          <ul>
            {postsWithDetails.map(({ itemId, postDetails }) => (
              <li className={s.postItem} key={itemId}>
                <Button
                  className={s.toggleBtn}
                  disabled={isToggling}
                  onClick={() => handleToggleSaved(itemId, 'post')}
                >
                  <AiTwotoneDelete />
                </Button>
                <Button as={Link} className={s.postInfo} to={`/post/${postDetails?._id}`}>
                  {postDetails?.title}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет сохраненных постов.</p>
        )}
      </div>
    </div>
  )
}
