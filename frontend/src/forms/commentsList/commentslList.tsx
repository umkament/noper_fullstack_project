import React from 'react'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import {
  CommentInterface,
  useGetAllCommentLikesQuery,
  useToggleCommentLikeMutation,
} from '@/services/comment'
import { BsBalloonHeartFill } from 'react-icons/bs'
import { PiHandHeartLight } from 'react-icons/pi'
import { TbHttpDelete } from 'react-icons/tb'

import s from './commentList.module.scss'

type CommentListType = {
  comments: CommentInterface[] | undefined
  currentUser: { _id: string } | null | undefined // Добавляем информацию о текущем пользователе
  onDeleteComment: (commentId: string) => void
  postAuthorId: string //id автора статьи
}

export const CommentsList: React.FC<CommentListType> = ({
  comments,
  currentUser,
  onDeleteComment,
  postAuthorId,
}) => {
  const commentIds = comments?.map(comment => comment._id)
  const { data: likesData } = useGetAllCommentLikesQuery({
    targetIds: commentIds,
    targetType: 'Comment',
  })
  const [toggleLike] = useToggleCommentLikeMutation()

  return (
    <div>
      {comments && comments.length > 0 ? (
        comments.map(comment => {
          const avatarUrl = comment.user.avatarUrl?.startsWith('/uploads/')
            ? `http://51.250.51.234:4411${comment.user.avatarUrl}`
            : comment.user.avatarUrl ||
              `https://robohash.org/${comment.user.username || 'unknown'}.png`

          console.log('currentUser', currentUser)
          console.log('currentUser._id', currentUser?._id)
          console.log('comment.user._id === currentUser._id', comment.user._id === currentUser?._id)
          console.log('postAuthorId === currentUser._id', postAuthorId === currentUser?._id)

          // Проверяем право на удаление
          const canDelete =
            currentUser &&
            currentUser._id &&
            (comment.user._id === currentUser._id || postAuthorId === currentUser._id)

          console.log('likesData: ', likesData)

          const likeInfo = likesData ? likesData[comment._id] : null

          console.log('likeInfo: ', likeInfo)

          const handleToggleLike = async () => {
            try {
              await toggleLike({ commentId: comment._id }).unwrap()
            } catch (error) {
              console.error('Ошибка при изменении лайка:', error)
            }
          }

          return (
            <div className={s.commcont} key={comment._id}>
              <Avatar avatar={avatarUrl} className={s.avatar} />
              <Typography className={s.username} variant={'caption'}>
                {`@${comment.user.username || 'Unknown User'}`}
              </Typography>
              <Typography className={s.text} variant={'body1'}>
                {comment.text || 'No text available'}
                <div className={s.favorite} onClick={handleToggleLike}>
                  {likeInfo?.likedByUser ? (
                    <BsBalloonHeartFill size={11} />
                  ) : (
                    <PiHandHeartLight size={14} />
                  )}
                  {'  '}
                  {likeInfo?.likesCount}
                </div>
              </Typography>
              {canDelete && (
                <Button
                  className={s.delButton}
                  onClick={() => onDeleteComment(comment._id)}
                  variant={'icon'}
                >
                  <TbHttpDelete />
                </Button>
              )}
            </div>
          )
        })
      ) : (
        <Typography className={s.nocomment} variant={'body2'}>
          комментариев пока нет
        </Typography>
      )}
    </div>
  )
}
