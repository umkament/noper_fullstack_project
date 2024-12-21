import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useNavigate } from 'react-router-dom'

import postImg from '@/assets/userPhoto.jpeg'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { SaveButton } from '@/components/ui/saveButton'
import { Typography } from '@/components/ui/typography'
import { AddCommentForm } from '@/forms/addCommentForm/addCommentForm'
import { CommentsList } from '@/forms/commentsList/commentslList'
import {
  CommentInterface,
  useDeleteCommentMutation,
} from '@/services/comment'
import {
  PostInterface,
  useDeletePostMutation,
  useGetPostLikeQuery,
  useTogglePostLikeMutation,
} from '@/services/posts'
import { UserInterface, useGetUserPostsQuery } from '@/services/users'
import { BsBalloonHeartFill } from 'react-icons/bs'
import { FaRegEye } from 'react-icons/fa6'
import { PiHandHeartLight } from 'react-icons/pi'
import rehypeHighlight from 'rehype-highlight'

import 'highlight.js/styles/github.css'

import s from './post-page.module.scss'

interface PostProps {
  comments: CommentInterface[]|undefined
  commentsRefetch: () => void
  currentUser: UserInterface | null | undefined
  //onAddComment: (newComment: CommentInterface) => void
  post: PostInterface
  postId: string | undefined
}

export const Post: React.FC<PostProps> = ({
  comments,
  commentsRefetch,
  currentUser,
  // onAddComment,
  post,
  postId,
}) => {
  const skipQuery = !postId
  const { data: likesData, isLoading: likesLoading } = useGetPostLikeQuery(
    { postId: postId! },
    { skip: skipQuery }
  )
  const [toggleLike] = useTogglePostLikeMutation()
  const [deletePost] = useDeletePostMutation()

  const [deleteComment, { error: deleteError, isLoading: isDeleting }] = useDeleteCommentMutation()
  const [updatedComments, setUpdatedComments] = useState<CommentInterface[]>(comments || [])
  const navigate = useNavigate()
  const { refetch } = useGetUserPostsQuery(currentUser?._id || '')

  const handleDeletePost = async () => {
    try {
      await deletePost({ postId: postId!, userId: post.user._id }).unwrap()
      alert('статья успешно удалена')
      await refetch()
      navigate(`/user/${currentUser?._id}`)
    } catch (error) {
      console.error('Ошибка при удалении статьи:', error)
      alert('Не удалось удалить статью')
    }
  }

  const handleEditPost = () => {
    navigate(`/edit-post/${postId}`)
  }

  const isAuthor = currentUser?._id === post.user._id

  const handleToggleLike = async () => {
    try {
      await toggleLike({ postId: postId! }).unwrap()
    } catch (error) {
      console.error('Ошибка при изменении лайка:', error)
    }
  }

  useEffect(() => {
    if (comments) {
        setUpdatedComments(comments);
      }
  }, [comments])

  const handleDeleteComment = async (commentId: string) => {
    try {
      console.log('Удаление комментария с ID:', commentId) // Отладка
      setUpdatedComments(prevComments => prevComments?.filter(comment => comment._id !== commentId))
      await deleteComment(commentId).unwrap()
      // После успешного удаления, обновляем состояние комментариев
      if (postId) {
        commentsRefetch()
      }
      console.log(`Комментарий ${commentId} успешно удален`)
    } catch (error) {
      console.error('Ошибка при удалении комментария', error)
    }
  }

  const handleAddComment = (newComment: CommentInterface) => {
    setUpdatedComments(prevComment => [...prevComment, newComment])
  }

  if (likesLoading) {
    return <div>Loading likes...</div>
  }

  const avatarImage =
    post?.user.avatarUrl && post.user.avatarUrl.startsWith('/uploads/')
      ? `http://84.201.184.120/api${post.user.avatarUrl}` // Если путь относительный и начинается с /uploads/
      : post.user.avatarUrl || `https://robohash.org/${post.user.username}.png`
  const postImage =
    post?.imageUrl && post.imageUrl.startsWith('/uploads/')
      ? `http://84.201.184.120/api${post.imageUrl}`
      : post.imageUrl || postImg

  return (
    <div className={s.mainContainer}>
      <div className={s.photoWrap}>
        <img alt={'postImg'} className={s.imgStyle} src={postImage} />
        <div className={s.info}>
          <Button as={Link} to={`/user/${post.user._id}`} variant={'icon'}>
            <Avatar avatar={avatarImage} />
          </Button>
          <div className={s.saved}>
            <SaveButton itemId={postId!} type={'post'} />
          </div>

          <Typography className={s.view}>
            <Typography className={s.viewsCount}>{post.viewsCount}</Typography>
            <FaRegEye className={s.eyeIcon} size={17} />
          </Typography>
          <Button className={s.favorite} onClick={handleToggleLike} variant={'icon'}>
            {likesData?.likedByUser ? (
              <BsBalloonHeartFill size={20} />
            ) : (
              <PiHandHeartLight size={20} />
            )}
            {likesData?.likesCount}
          </Button>
          <Typography className={s.date}>
            {new Date(post.createdAt).toLocaleDateString()}
          </Typography>
        </div>
      </div>
      <div className={s.textWrap}>
        <Typography className={s.title} variant={'h2'}>
          {post.title}
        </Typography>
        <Typography className={s.tags} variant={'caption'}>
          {post?.tags &&
            (post.tags.length > 1 ? (
              post.tags.map((tag, index) => <span key={index}>{`#${tag.trim()} `}</span>)
            ) : (
              <span>{`#${post.tags[0].trim()} `}</span>
            ))}
        </Typography>
        <Typography className={s.text} variant={'body1'}>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{post.text}</ReactMarkdown>
        </Typography>
      </div>
      {isAuthor && (
        <div className={s.authorControls}>
          <Button onClick={handleEditPost} variant={'primary'}>
            Редактировать
          </Button>
          <Button onClick={handleDeletePost} variant={'primary'}>
            Удалить
          </Button>
        </div>
      )}
      <div className={s.commentWrap}>
        <AddCommentForm onAddComment={handleAddComment} postId={postId} />
        <CommentsList
          comments={updatedComments}
          currentUser={currentUser}
          onDeleteComment={handleDeleteComment}
          postAuthorId={post.user._id}
        />
        {isDeleting && (
          <Typography className={s.isDeleting} variant={'body1'}>
            комментарий удален без возможности восстановления
          </Typography>
        )}
        {deleteError &&
          (console.error('Ошибка при удалении комментария:', JSON.stringify(deleteError)),
          (<p></p>))}
      </div>
    </div>
  )
}
