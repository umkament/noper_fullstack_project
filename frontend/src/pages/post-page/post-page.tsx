import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Typography } from '@/components/ui/typography'
import { useAuthMeQuery } from '@/services/auth'
import { useGetCommentsByPostQuery } from '@/services/comment'
import { useGetPostQuery } from '@/services/posts'
import { skipToken } from '@reduxjs/toolkit/query/react'

import { Post } from './post'

export const PostPage = () => {
  const { postId } = useParams<{ postId?: string }>()
  const { userId } = useParams<{ userId?: string }>()

  console.log('userId:', userId)

  const {
    data: currentUser,
    error: userError,
    isLoading: userLoading,
  } = useAuthMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  // Если postId отсутствует, передаем в useGetPostQuery skipToken, чтобы пропустить выполнение запроса
  const {
    data: post,
    error: postError,
    isLoading: postLoading,
  } = useGetPostQuery(postId ?? skipToken)

  const {
    data: commentsData,
    refetch: commentsRefetch,
  } = useGetCommentsByPostQuery(postId ?? skipToken)

  useEffect(() => {
    if (postId && commentsRefetch) {
      commentsRefetch()
    }
  }, [postId, commentsRefetch])

  if (postLoading || userLoading) {
    return <div>Loading...</div>
  }
  if (userError) {
    return <div>Error loading user: {JSON.stringify(userError)}</div>
  }

  if (postError) {
    return <div>Error: {JSON.stringify(postError)}</div>
  }

  return post ? (
    <Post
      comments={commentsData}
      commentsRefetch={commentsRefetch}
      currentUser={currentUser}
      // onAddComment={handleAddComment}
      post={post}
      postId={postId}
    />
  ) : (
    <Typography variant={'h2'}>Post not found</Typography>
  )
}
